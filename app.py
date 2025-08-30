from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/weather")
def weather():
    url = "http://meteo.dii.unipi.it/pisa/"
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, "html.parser")

    def extract_value(label):
        # Find <li> containing label, then get the <span> value
        li = None
        for el in soup.find_all("li"):
            if label in el.get_text():
                li = el
                break
        return li.find("span").text.strip() if li else None

    data = {
        "temperatura": extract_value("Temperatura"),
        "pressione": extract_value("Pressione"),
        "umidita": extract_value("Umidità"),
        "radiazione": extract_value("Radiazione"),
        "vento": extract_value("Intensità del vento"),
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
