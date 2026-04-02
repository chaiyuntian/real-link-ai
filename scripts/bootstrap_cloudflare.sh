#!/usr/bin/env bash

set -euo pipefail

ACCOUNT_ID="${ACCOUNT_ID:-2462af7e529ad7b8ffdc3c389caabeb6}"
ZONE_ID="${ZONE_ID:-4e54ac80cb84a06ec66a8fdd795f26d2}"
BUCKET_NAME="${BUCKET_NAME:-real-link-ai-ideas-batch1-videos}"
VIDEO_DOMAIN="${VIDEO_DOMAIN:-videos-batch1.real-link.ai}"

npx wrangler whoami >/dev/null

if ! npx wrangler r2 bucket list | rg -q "^name:\\s+${BUCKET_NAME}$"; then
  npx wrangler r2 bucket create "${BUCKET_NAME}"
fi

npx wrangler r2 bucket dev-url enable "${BUCKET_NAME}" || true
npx wrangler r2 bucket domain add "${BUCKET_NAME}" --domain "${VIDEO_DOMAIN}" --zone-id "${ZONE_ID}" -y || true

echo "Cloudflare bootstrap complete."
echo "Account ID: ${ACCOUNT_ID}"
echo "Zone ID: ${ZONE_ID}"
echo "Bucket: ${BUCKET_NAME}"
echo "Video domain: ${VIDEO_DOMAIN}"
