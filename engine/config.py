ASSISTANT_NAME ='jarvis'# engine/config.py
# central config values

import os

ASSISTANT_NAME = os.environ.get("ASSISTANT_NAME", "jarvis")

# Chatbot API key - prefer environment variable. If you want to hardcode for local testing,
# you can put it here (not recommended for production).
OPENROUTER_API_KEY = os.environ.get("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")
