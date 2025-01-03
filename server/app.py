from flask import Flask
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Allow CORS
CORS(app, origins="http://localhost:3000")

# Define a route 
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
