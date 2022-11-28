"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
#IMPORTS PRACTICE
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    #user = json.loads(request.data)
    

    user = list(User.query.filter_by(email=email, password=password))
    
    if(user != None):
        if (len(user) > 0):
            access_token = create_access_token(identity=user[0].id)
            response_body = {
            "message": "Token create"
            }
        else:
            response_body = {
            "message": "Token not exist"
            }
    print(access_token)

    return jsonify(response_body), 200 

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = (get_jwt_identity())
    return jsonify(logged_in_as=current_user), 200
    #