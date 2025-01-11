from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

# Initialize the Flask application
app = Flask(__name__)
load_dotenv()

# Allow CORS
FRONTEND_ENDPOINT = os.getenv('FRONTEND_ENDPOINT')
CORS(app, origins=FRONTEND_ENDPOINT)

# Connect to MySQL
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

db = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
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
