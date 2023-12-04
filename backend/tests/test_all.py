import json
from flask import Flask
from config import TestingConfig
from app.models import db, Customer
from app.routes import customer_bp

def test_get_customers():
    app = Flask(__name__)
    app.config.from_object(TestingConfig)
    db.init_app(app)
    app.register_blueprint(customer_bp)

    with app.app_context():
        db.create_all()
        client = app.test_client()
        response = client.get('/get_customers')

    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert isinstance(data, list)

    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_get_customer():
    app = Flask(__name__)
    app.config.from_object(TestingConfig)
    db.init_app(app)
    app.register_blueprint(customer_bp)

    with app.app_context():
        db.create_all()
        sample_customer = Customer(name='Test User', contact_info='+123456789')
        db.session.add(sample_customer)
        db.session.commit()

        client = app.test_client()
        response = client.post('/get_customers', json={'id': sample_customer.id})

    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert 'id' in data
    assert 'name' in data
    assert 'contact_info' in data
    assert 'notes' in data

    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_create_customer():
    app = Flask(__name__)
    app.config.from_object(TestingConfig)
    db.init_app(app)
    app.register_blueprint(customer_bp)

    with app.app_context():
        db.create_all()
        client = app.test_client()
        response = client.post('/create_customers', json={
    "name": "Test User",
    "contact_info": "+123456789123",
    "notes": "This is test customer"
})

    assert response.status_code == 200
    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_update_customer():
    app = Flask(__name__)
    app.config.from_object(TestingConfig)
    db.init_app(app)
    app.register_blueprint(customer_bp)

    with app.app_context():
        db.create_all()
        sample_customer = Customer(name='Test User', contact_info='+123456789')
        db.session.add(sample_customer)
        db.session.commit()

        client = app.test_client()
        response = client.post('/update_customers', json={
    "id": sample_customer.id,
    "name": "Test User Update",
    "contact_info": "+123456789123",
    "notes": "This is test customer updated"
})

    assert response.status_code == 200

    resp = client.post('/get_customers', json={'id': sample_customer.id})
    data = json.loads(resp.data.decode('utf-8'))
    assert data['name'] == "Test User Update"
    assert data['contact_info'] == "+123456789123"
    assert data['notes'] == "This is test customer updated"

    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_delete_customer():
    app = Flask(__name__)
    app.config.from_object(TestingConfig)
    db.init_app(app)
    app.register_blueprint(customer_bp)

    with app.app_context():
        db.create_all()
        sample_customer = Customer(name='Test User', contact_info='+123456789')
        db.session.add(sample_customer)
        db.session.commit()

        client = app.test_client()
        response = client.delete('/delete_customers', json={'id': sample_customer.id})

    assert response.status_code == 200

    resp = client.post('/get_customers', json={'id': sample_customer.id})
    assert resp.status_code == 400
    with app.app_context():
        db.session.remove()
        db.drop_all()