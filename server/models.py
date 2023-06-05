from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String)
    admin = db.Column(db.Boolean)

    users = db.relationship("User_Product", backref= "user")

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    units = db.Column(db.Integer)
    units_sold = db.Column(db.Integer)
    image_url = db.Column(db.String)

    products = db.relationship("User_Product", backref= "product")
    def __repr__(self):
        return f'<Product {self.id}: {self.name}>'
class User_Product(db.Model, SerializerMixin):
    __tablename__ = 'user_products'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    

    def __repr__(self):
        return f'<User Product {self.id}>'
class Transaction(db.Model, SerializerMixin):
    __tablesname__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<Transaction {self.id}>'

# Models go here!
