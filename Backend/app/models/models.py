from sqlalchemy import Column, Float, ForeignKey, Integer, String
from app.db.database import Base

class Customer(Base):
    __tablename__="customers"
    
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String,nullable=False)
    country=Column(String,nullable=False)



class Product(Base):
    __tablename__="products"
    
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String,nullable=False)
    category=Column(String,nullable=False)
    price=Column(Float,nullable=False)
    
    



class Sales(Base):
    __tablename__="sales"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    country = Column(String, nullable=False)
    quarter = Column(String, nullable=False)
