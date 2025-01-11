from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

# Initialize the Flask application
app = Flask(__name__)

# Allow CORS
CORS(app, origins="http://localhost:3000")

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="titanic-dataset"
)

@app.route('/api/titanic', methods=['GET'])
def get_titanic_data():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM titanic")
    data = cursor.fetchall()
    return jsonify(data)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
