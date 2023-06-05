#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Product, User_Product, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
# Views go here!

class Users(Resource):
    def get(self):
        pass
    
api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def patch(self):
        pass
    def delete(self):
        pass
api.add_resource(UsersById, '/users/<int:id>')


class User_Products(Resource):
    def get(self):
        pass
    
api.add_resource(User_Products, '/userproducts')

class Transactions(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def patch(self):
        pass
    def delete(self):
        pass
api.add_resource(Transactions, '/transactions')


class TransactionsById(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def patch(self):
        pass
    def delete(self):
        pass
api.add_resource(TransactionsById, '/transactions/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
