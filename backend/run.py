from flask import Flask
from config import Config
from app.models import db
from app.routes import customer_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database
db.init_app(app)

# Register the Blueprint
app.register_blueprint(customer_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
