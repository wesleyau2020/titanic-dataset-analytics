import mysql.connector 
import pandas as pd

# Load the dataset
df = pd.read_csv('dataset/titanic.csv')

# Drop irrelevant columns
df = df.drop(columns=['PassengerId', 'Name', 'Ticket', 'Cabin'])

# Fill missing values
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

# Encode categorical variables
df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})
df['Embarked'] = df['Embarked'].map({'C': 0, 'Q': 1, 'S': 2})

# Save the cleaned dataset
df.to_csv('dataset/cleaned_titanic.csv', index=False)

print("Data cleaned successfully!")

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="titanic-dataset"
)

cursor = db.cursor()

# Create a table for the Titanic dataset
cursor.execute('''
CREATE TABLE IF NOT EXISTS titanic (
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
    cursor.execute('''
        INSERT INTO titanic (Survived, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    ''', tuple(row))

db.commit()
print("Data saved to MySQL successfully!")