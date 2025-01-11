import mysql.connector 
import pandas as pd
from dotenv import load_dotenv
import os

def clean_titanic_data(input_file, output_file):
    """
    Clean the Titanic dataset by removing irrelevant columns,
    filling missing values, encoding categorical variables, and saving the cleaned data.

    :param input_file: Path to the input dataset (CSV file).
    :param output_file: Path to save the cleaned dataset.
    """
    # Load the dataset
    df = pd.read_csv(input_file)

    # Drop irrelevant columns
    df = df.drop(columns=['PassengerId', 'Name', 'Ticket', 'Cabin'])

    # Fill missing values
    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

    # Encode categorical variables
    df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})
    df['Embarked'] = df['Embarked'].map({'C': 0, 'Q': 1, 'S': 2})

    # Save the cleaned dataset
    df.to_csv(output_file, index=False)

    print("Data cleaned successfully!")

def save_titanic_data_to_mysql(input_file, table_name='titanic'):
    """
    Clean the Titanic dataset, connect to MySQL, and save the data into a MySQL table.

    :param input_file: Path to the input dataset (CSV file).
    :param table_name: The name of the table in the MySQL database where data will be inserted.
    """
    # Load environment variables from .env file
    load_dotenv()
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')

    # Load and clean the dataset
    df = pd.read_csv(input_file)

    # Connect to MySQL
    db = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = db.cursor()

    # Create table if it doesn't exist
    cursor.execute(f'''
    CREATE TABLE IF NOT EXISTS {table_name} (
        Survived INT,
        Pclass INT,
        Sex INT,
        Age FLOAT,
        SibSp INT,
        Parch INT,
        Fare FLOAT,
        Embarked INT
    )
    ''')

    # Insert cleaned data into the table
    for _, row in df.iterrows():
        cursor.execute(f'''
            INSERT INTO {table_name} (Survived, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', tuple(row))

    db.commit()

    # Close connection
    cursor.close()
    db.close()

    print("Data saved to MySQL successfully!")

input_file = 'dataset/titanic.csv' 
output_file = 'dataset/cleaned_titanic.csv'  

clean_titanic_data(input_file, output_file)
save_titanic_data_to_mysql(output_file)
