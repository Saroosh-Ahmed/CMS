from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    contact_info = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.Text, nullable=True)

