# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
# from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    admin = db.Column(db.Boolean, default=False)

    shopping_sessions = db.relationship("Shopping_Session", backref="user")

    serialize_rules = ('-shopping_sessions.user',)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates("email")
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Failed email validation: Email must include a @")
        return email
    
    # @validates("password")
    # def validate_email(self, key, password):
    #     if len(password) < 6:
    #         raise ValueError("Failed password validation: Password must be 6 characters or longer")
    #     return password
    
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    description = db.Column(db.String)
    units = db.Column(db.Integer)
    units_sold = db.Column(db.Integer)
    image_url = db.Column(db.String)

    cart_items = db.relationship("Cart_Item", backref="product")

    serialize_rules = ('-cart_items.product',)
    
class Cart_Item(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    shopping_session_id = db.Column(db.Integer, db.ForeignKey('shopping_sessions.id'))

    serialize_rules = ('-product.cart_items', '-shopping_session.cart_items')
    
        
class Shopping_Session(db.Model, SerializerMixin):
    __tablename__ = 'shopping_sessions'
    id = db.Column(db.Integer, primary_key=True)
    # total_price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    purchased = db.Column(db.Boolean, default=False)

    cart_items = db.relationship("Cart_Item", backref="shopping_session")

    serialize_rules = ('-user.shopping_sessions', '-cart_items.shopping_session',)


# Models go here!
