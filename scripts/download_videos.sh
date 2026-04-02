#!/usr/bin/env bash

set -euo pipefail

mkdir -p assets/videos assets/tmp

curl -L https://download.blender.org/peach/trailer/trailer_480p.mov \
  -o assets/videos/big-buck-bunny-trailer.mov

curl -L https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4 \
  -o assets/videos/sintel-trailer.mp4

curl -L https://download.blender.org/demo/movies/tears-of-steel_teaser.mp4.zip \
  -o assets/tmp/tears-of-steel-teaser.zip

unzip -o assets/tmp/tears-of-steel-teaser.zip -d assets/tmp/tears-of-steel-teaser

mp4_path="$(find assets/tmp/tears-of-steel-teaser -type f -name '*.mp4' | head -n 1)"

if [[ -z "${mp4_path}" ]]; then
  echo "Could not locate extracted Tears of Steel teaser MP4" >&2
  exit 1
fi

cp "${mp4_path}" assets/videos/tears-of-steel-teaser.mp4

echo "Downloaded:"
ls -lh assets/videos

