import sqlite3

# --- Connect to DB ---
conn = sqlite3.connect("jarvis.db")
cursor = conn.cursor()

# --- Drop old tables (reset DB) ---
cursor.execute("DROP TABLE IF EXISTS sys_command")
cursor.execute("DROP TABLE IF EXISTS web_command")

# --- Create fresh tables ---
cursor.execute('''
CREATE TABLE sys_command (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    path TEXT
)''')

cursor.execute('''
CREATE TABLE web_command (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    url TEXT
)''')

# ✅ Add Windows system apps
system_apps = {
    "notepad": r"C:\Windows\System32\notepad.exe",
    "calculator": r"C:\Windows\System32\calc.exe",
    "paint": r"C:\Windows\System32\mspaint.exe",
    "wordpad": r"C:\Windows\System32\write.exe",
    "cmd": r"C:\Windows\System32\cmd.exe",
    "powershell": r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe",
    "explorer": r"C:\Windows\explorer.exe",
    "taskmanager": r"C:\Windows\System32\Taskmgr.exe",
    "controlpanel": r"C:\Windows\System32\control.exe",
    "settings": r"C:\Windows\ImmersiveControlPanel\SystemSettings.exe",
    "snippingtool": r"C:\Windows\System32\SnippingTool.exe",
    "charmap": r"C:\Windows\System32\charmap.exe",
    "regedit": r"C:\Windows\regedit.exe",
    "word": r"C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE",
    "excel": r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE",
    "powerpoint": r"C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE",
    "outlook": r"C:\Program Files\Microsoft Office\root\Office16\OUTLOOK.EXE",
    "edge": r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "chrome": r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "firefox": r"C:\Program Files\Mozilla Firefox\firefox.exe"
}

for name, path in system_apps.items():
    cursor.execute("INSERT OR IGNORE INTO sys_command (name, path) VALUES (?, ?)", (name, path))


# ✅ Add 100+ websites
websites = {
    # Social Media
    "google": "https://www.google.com",
    "youtube": "https://www.youtube.com",
    "facebook": "https://www.facebook.com",
    "instagram": "https://www.instagram.com",
    "twitter": "https://x.com",
    "linkedin": "https://www.linkedin.com",
    "whatsapp": "https://web.whatsapp.com",
    "telegram": "https://web.telegram.org",
    "discord": "https://discord.com",
    "reddit": "https://www.reddit.com",
    "pinterest": "https://www.pinterest.com",
    "quora": "https://www.quora.com",

    # Streaming
    "netflix": "https://www.netflix.com",
    "hotstar": "https://www.hotstar.com",
    "primevideo": "https://www.primevideo.com",
    "spotify": "https://www.spotify.com",
    "soundcloud": "https://soundcloud.com",
    "jiosaavn": "https://www.jiosaavn.com",
    "gaana": "https://gaana.com",
    "zee5": "https://www.zee5.com",
    "mxplayer": "https://www.mxplayer.in",
    "sonyliv": "https://www.sonyliv.com",
    "voot": "https://www.voot.com",
    "netmirror": "",

    # Work & Study
    "github": "https://github.com",
    "stackoverflow": "https://stackoverflow.com",
    "wikipedia": "https://www.wikipedia.org",
    "chatgpt": "https://chat.openai.com",
    "colab": "https://colab.research.google.com",
    "kaggle": "https://www.kaggle.com",
    "coursera": "https://www.coursera.org",
    "udemy": "https://www.udemy.com",
    "edx": "https://www.edx.org",
    "medium": "https://medium.com",

    # Shopping
    "amazon": "https://www.amazon.com",
    "flipkart": "https://www.flipkart.com",
    "myntra": "https://www.myntra.com",
    "snapdeal": "https://www.snapdeal.com",
    "ajio": "https://www.ajio.com",
    "ebay": "https://www.ebay.com",

    # Tools
    "gmail": "https://mail.google.com",
    "outlook": "https://outlook.live.com",
    "drive": "https://drive.google.com",
    "maps": "https://maps.google.com",
    "translate": "https://translate.google.com",
    "weather": "https://weather.com",
    "bing": "https://www.bing.com",
    "duckduckgo": "https://duckduckgo.com",
    "yahoo": "https://www.yahoo.com",
    "speedtest": "https://www.speedtest.net",
    "canva": "https://www.canva.com",
    "figma": "https://www.figma.com",
    "notion": "https://www.notion.so",
    "trello": "https://trello.com",
    "slack": "https://slack.com",
    "zoom": "https://zoom.us",
    "skype": "https://www.skype.com",
    "teams": "https://teams.microsoft.com"
}

for name, url in websites.items():
    cursor.execute("INSERT OR IGNORE INTO web_command (name, url) VALUES (?, ?)", (name, url))

conn.commit()
conn.close()
print("✅ Fresh database created with system apps & 100+ websites!")
