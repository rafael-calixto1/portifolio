#!/bin/bash
set -e
cd "$(dirname "$0")/.."
npm run build
exec npx serve -s dist/portfolio-app/browser -l "${PORT:-6767}"
