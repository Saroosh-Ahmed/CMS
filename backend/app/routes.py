from flask import Blueprint, request
import re
from .models import db, Customer

contact_pattern = re.compile(r'^\+(?:[0-9] ?){6,14}[0-9]$')
name_pattern = re.compile(r'^[A-Za-z\s\'.-]+$')

customer_bp = Blueprint('customer_bp', __name__)

@customer_bp.route('/get_customers', methods=['GET'])
def get_customers():
    # customers = Customer.query.all()
    q = db.session.query(Customer)
    results = q.all()
    customers = [{"id":r.id,"name":r.name,"contact_info":r.contact_info,"notes":r.notes} for r in results]
    return customers, 200

@customer_bp.route('/get_customers', methods=['POST'])
def get_customer():
    data = request.json
    id = data['id']
    if not id:
        return {"msg": f"Must provide valid id."}, 400
    if not isinstance(id, int):
        return {"msg": f"Id must be in valid integer."}, 400
    q = db.session.query(Customer).filter(Customer.id == id)
    result = q.first()
    if not result:
        return {"msg": f"No customer found."}, 400
    customers = {"id":result.id,"name":result.name,"contact_info":result.contact_info,"notes":result.notes}
    return customers, 200

@customer_bp.route('/create_customers', methods=['POST'])
def create_customer():
    data = request.json
    if not data['name']:
        return {"msg": f"Must provide valid name."}, 400
    if not re.match(name_pattern, data['name']):
        return {"msg": f"Must provide valid name."}, 400
    if not isinstance(data['name'], str):
        return {"msg": f"Name must be in valid string."}, 400
    if not data['contact_info']:
        return {"msg": f"Must provide valid contact information."}, 400
    if not re.match(contact_pattern, data['contact_info']):
        return {"msg": f"Must provide valid contact information."}, 400
    q = db.session.query(Customer).filter(Customer.name == data['name']).filter(Customer.contact_info == data['contact_info'])
    results = q.all()
    if results:
        return {"msg": f"Customer already exist."}, 400
    new_customer = Customer(**data)
    db.session.add(new_customer)
    db.session.commit()
    return {"msg": f"{new_customer.name} has been added as new customer."}, 200

@customer_bp.route('/update_customers', methods=['POST'])
def update_customer():
    data = request.json
    id = data['id']
    if not id:
        return {"msg": f"Must provide valid id."}, 400
    if not isinstance(id, int):
        return {"msg": f"Id must be in valid integer."}, 400
    
    if data['name'] and not re.match(name_pattern, data['name']):
        return {"msg": f"Must provide valid name."}, 400
    if not isinstance(data['name'], str):
        return {"msg": f"Name must be in valid string."}, 400
    
    if data['contact_info'] and not re.match(contact_pattern, data['contact_info']):
        return {"msg": f"Must provide valid contact information."}, 400
    
    q = db.session.query(Customer).filter(Customer.id == id)
    customer = q.first()
    if not customer:
        return {"msg": f"No customer found."}, 400
    print(customer)
    for key, value in data.items():
        if value:
            setattr(customer, key, value)
    db.session.commit()
    return {"msg": f"{customer.name}'s data has been updated."}, 200

@customer_bp.route('/delete_customers', methods=['DELETE'])
def delete_customer():
    data = request.json
    id = data['id']
    if not id:
        return {"msg": f"Must provide valid id."}, 400
    if not isinstance(id, int):
        return {"msg": f"Id must be in valid integer."}, 400
    q = db.session.query(Customer).filter(Customer.id == id)
    customer = q.first()
    if not customer:
        return {"msg": f"No customer found."}, 400
    db.session.delete(customer)
    db.session.commit()
    return {'msg': 'Customer deleted successfully.'}, 200
