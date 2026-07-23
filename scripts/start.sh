#!/bin/bash
set -e
cd "$(dirname "$0")/.."
npm run build
exec npx serve -s build -l "${PORT:-6767}"
