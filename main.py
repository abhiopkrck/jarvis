import os
import eel
from engine.features import *
from engine.command import *
from engine.audio import *
eel.init("www")
playaudio()
os.system('start msedge.exe --app="http://localhost:8000/index.html"')
eel.start("index.html", mode=None, block=True, host="localhost", port=8000)
