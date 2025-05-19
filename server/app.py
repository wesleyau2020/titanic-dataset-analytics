from flask import Flask, jsonify, request
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

db_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="titanic_pool",
    pool_size=5,
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

# Histogram bins
age_groups = [
    "0-10", "11-20", "21-30", "31-40", "41-50", 
    "51-60", "61-70", "71-80"
]

def process_age_groups(data):
    result = {index: {'survivors': 0, 'nonSurvivors': 0} for index in range(len(age_groups))}

    def get_age_group(age):
        if age is None:
            return None
        # Group by decade
        index = min(age // 10, len(age_groups) - 1)
        return index

    for passenger in data:
        group_index = get_age_group(passenger['Age'])
        if group_index is not None:
            if passenger['Survived'] == 1:
                result[group_index]['survivors'] += 1
            else:
                result[group_index]['nonSurvivors'] += 1
    
    return result

@app.route('/api/titanic/survival-chart', methods=['GET'])
def get_chart_data():
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM titanic")
        data = cursor.fetchall()
        processed_data = process_age_groups(data)
        return jsonify(processed_data)
    finally:
        cursor.close()
        conn.close()  # Return connection to pool

@app.route('/api/titanic/survival-table', methods=['GET'])
def get_table_data():
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM titanic")
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
