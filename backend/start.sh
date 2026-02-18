#!/bin/bash
cd /home/user/webapp/backend
export PYTHONPATH=/home/user/webapp/backend
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
