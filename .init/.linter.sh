#!/bin/bash
cd /home/kavia/workspace/code-generation/client-side-tic-tac-toe-1ab6e5e1/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

