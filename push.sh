#!/bin/bash
cd /Users/victor/dev/intermediate-level-learning
rm -f .git/index.lock 2>/dev/null
git add -A
git commit -m "fix: Improve Google Drive file content fetching with better error handling and logging"
git push origin main
