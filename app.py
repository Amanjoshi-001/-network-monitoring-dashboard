from flask import Flask, jsonify, render_template
from monitor import get_network_stats

app = Flask(__name__)


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/stats")
def stats():
    return jsonify(get_network_stats())


if __name__ == "__main__":
    app.run(debug=True)
