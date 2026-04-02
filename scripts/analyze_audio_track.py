from __future__ import annotations

import json
import math
import sys
import wave
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
from scipy.io import wavfile


def moving_average(values: np.ndarray, window: int) -> np.ndarray:
    if window <= 1:
      return values
    kernel = np.ones(window) / window
    return np.convolve(values, kernel, mode="same")


def detect_peaks(values: np.ndarray, threshold: float, min_distance: int) -> list[int]:
    peaks: list[int] = []
    last_peak = -min_distance
    for index in range(1, len(values) - 1):
        if index - last_peak < min_distance:
            continue
        if values[index] > threshold and values[index] >= values[index - 1] and values[index] >= values[index + 1]:
            peaks.append(index)
            last_peak = index
    return peaks


def classify_sections(times: np.ndarray, envelope: np.ndarray, duration: float) -> list[dict]:
    if duration <= 0:
        return []
    boundaries = [0.0, duration * 0.3, duration * 0.62, duration]
    labels = ["intro", "lift", "drop"]
    sections = []
    for label, start, end in zip(labels, boundaries[:-1], boundaries[1:]):
        mask = (times >= start) & (times < end)
        avg_energy = float(np.mean(envelope[mask])) if np.any(mask) else 0.0
        sections.append(
            {
                "label": label,
                "start": round(start, 3),
                "end": round(end, 3),
                "averageEnergy": round(avg_energy, 6),
            }
        )
    return sections


def main() -> None:
    if len(sys.argv) != 3:
        print("usage: analyze_audio_track.py <input.wav> <output.json>", file=sys.stderr)
        raise SystemExit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    sample_rate, audio = wavfile.read(input_path)

    if audio.ndim > 1:
        signal = audio.mean(axis=1)
    else:
        signal = audio.astype(np.float64)

    signal = signal.astype(np.float64)
    if np.max(np.abs(signal)) > 0:
        signal = signal / np.max(np.abs(signal))

    frame_size = 2048
    hop_size = 512
    frame_count = max(0, (len(signal) - frame_size) // hop_size)

    energies = []
    times = []
    spectral_flux = []
    previous_spectrum = None
    for frame_index in range(frame_count):
        start = frame_index * hop_size
        frame = signal[start:start + frame_size]
        windowed = frame * np.hanning(len(frame))
        rms = float(np.sqrt(np.mean(windowed ** 2)))
        spectrum = np.abs(np.fft.rfft(windowed))
        if previous_spectrum is None:
            flux = 0.0
        else:
            flux = float(np.sum(np.maximum(0.0, spectrum - previous_spectrum)))
        previous_spectrum = spectrum
        energies.append(rms)
        spectral_flux.append(flux)
        times.append(start / sample_rate)

    energies_arr = np.array(energies)
    flux_arr = np.array(spectral_flux)
    if np.max(flux_arr) > 0:
        flux_arr = flux_arr / np.max(flux_arr)

    novelty = (energies_arr * 0.45) + (flux_arr * 0.55)
    smooth = moving_average(novelty, 6)
    threshold = float(np.mean(smooth) + np.std(smooth) * 0.35)
    min_distance = max(1, int((sample_rate * 60 / 180) / hop_size))
    peak_indices = detect_peaks(smooth, threshold, min_distance)
    beat_times = [round(times[index], 3) for index in peak_indices]

    intervals = np.diff(np.array(beat_times)) if len(beat_times) > 1 else np.array([])
    bpm = 0.0
    if len(intervals) > 0:
        median_interval = float(np.median(intervals))
        if median_interval > 0:
            bpm = 60.0 / median_interval

    duration = len(signal) / sample_rate
    sections = classify_sections(np.array(times), energies_arr, duration)
    output = {
        "generatedAt": datetime.fromtimestamp(input_path.stat().st_mtime, tz=timezone.utc).isoformat(),
        "source": input_path.name,
        "sampleRate": int(sample_rate),
        "duration": round(duration, 3),
        "estimatedBpm": round(bpm, 2),
        "beatCount": len(beat_times),
        "beats": beat_times,
        "sections": sections,
        "energyFrames": [
            {
                "time": round(times[index], 3),
                "energy": round(float(energies_arr[index]), 6),
                "novelty": round(float(smooth[index]), 6),
            }
            for index in range(0, len(times), max(1, len(times) // 120 or 1))
        ],
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(output, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
