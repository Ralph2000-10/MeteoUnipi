import requests
from bs4 import BeautifulSoup
import json

URL = "http://meteo.dii.unipi.it/pisa/"
r = requests.get(URL, timeout=10)
soup = BeautifulSoup(r.text, "html.parser")

def extract_value(label):
    for el in soup.find_all("li"):
        if label in el.get_text():
            return el.find("span").text.strip()
    return None

data = {
    "temperatura": extract_value("Temperatura"),
    "pressione": extract_value("Pressione"),
    "umidita": extract_value("Umidità"),
    "radiazione": extract_value("Radiazione"),
    "vento": extract_value("Intensità del vento"),
}

with open("weather.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
