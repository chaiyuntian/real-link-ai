#!/usr/bin/env bash

set -euo pipefail

BUCKET_NAME="${BUCKET_NAME:-real-link-ai-ideas-batch1-videos}"
CACHE_CONTROL="${CACHE_CONTROL:-public, max-age=31536000, immutable}"

for filename in \
  "big-buck-bunny-trailer.mov" \
  "sintel-trailer.mp4" \
  "tears-of-steel-teaser.mp4"; do
  path="assets/videos/${filename}"
  if [[ ! -f "${path}" ]]; then
    echo "Missing asset: ${path}" >&2
    exit 1
  fi

  content_type="video/mp4"
  if [[ "${filename}" == *.mov ]]; then
    content_type="video/quicktime"
  fi

  echo "Uploading ${filename} to ${BUCKET_NAME}..."
  npx wrangler r2 object put "${BUCKET_NAME}/${filename}" \
    --file "${path}" \
    --content-type "${content_type}" \
    --cache-control "${CACHE_CONTROL}" \
    --remote
done

echo "R2 sync complete."
