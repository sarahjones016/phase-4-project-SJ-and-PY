#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Product, Cart_Item, Order

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
# Views go here!

class Products(Resource):
    def get(self):
        products_dict = [products.to_dict(only = ("name", "description", "image_url", "price", "units", "units_sold")) for products in Product.query.all()]

        response = make_response(
            products_dict,
            200
        )

        return response

api.add_resource(Products, "/products")

class Cart_Items(Resource):

    def post(self):
        
        try:
            new_cart_item = Cart_Item(
                user_id = request.json['user_id'],
                product_id = request.json['product_id'],
                order_id = request.json['order_id'],
            )

            db.session.add(new_cart_item)
            db.session.commit()

            cart_item_dict = new_cart_item.to_dict()
            
            response = make_response(
                cart_item_dict,
                201
            )
            return response
        except:
            raise Exception
        
api.add_resource(Cart_Items, '/cart_items')
#create order class instance connected to cart items
#when the first item gets added to cart, an order instance is created
#when the order instance is created, a cart order is created before any other items get added
#we need to use order id to create, use order id for cart items
#
#  
# class Users(Resource):
#     def get(self):
#         pass

# api.add_resource(Users, '/users')


# class UsersById(Resource):
#     def get(self):
#         pass
#     def post(self):
#         pass
#     def patch(self):
#         pass
#     def delete(self):
#         pass
# api.add_resource(UsersById, '/users/<int:id>')


# class User_Products(Resource):
#     def get(self):
#         pass
    
# api.add_resource(User_Products, '/userproducts')

# class Transactions(Resource):
#     def get(self):
#         pass
#     def post(self):
#         pass
#     def patch(self):
#         pass
#     def delete(self):
#         pass
# api.add_resource(Transactions, '/transactions')


# class TransactionsById(Resource):
#     def get(self):
#         pass
#     def post(self):
#         pass
#     def patch(self):
#         pass
#     def delete(self):
#         pass
# api.add_resource(TransactionsById, '/transactions/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
