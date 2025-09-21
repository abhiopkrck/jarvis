# engine/helper.py
import os
import re
import time

def extract_yt_term(command: str):
    """
    Extract text between 'play' and 'on youtube'
    """
    if not command:
        return None
    pattern = r'play\s+(.*?)\s+on\s+youtube'
    match = re.search(pattern, command, re.IGNORECASE)
    return match.group(1) if match else None

def remove_words(input_string: str, words_to_remove):
    if not input_string:
        return ""
    words = input_string.split()
    filtered = [w for w in words if w.lower() not in set(w.lower() for w in words_to_remove)]
    return " ".join(filtered)

# key adb helpers (best-effort)
def keyEvent(key_code):
    command = f'adb shell input keyevent {key_code}'
    os.system(command)
    time.sleep(0.5)

def tapEvents(x, y):
    command = f'adb shell input tap {x} {y}'
    os.system(command)
    time.sleep(0.5)

def adbInput(message):
    # message must be escaped by caller if needed
    command = f'adb shell input text "{message}"'
    os.system(command)
    time.sleep(0.5)

def goback(repeat=6):
    for i in range(repeat):
        keyEvent(4)  # KEYCODE_BACK
