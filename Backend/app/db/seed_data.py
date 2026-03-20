from .database import SessionLocal, engine, Base
from app.models.models import Customer, Product, Sales

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# clear old data
db.query(Sales).delete()
db.query(Customer).delete()
db.query(Product).delete()

customers = [
    Customer(name="Alice", country="USA"),
    Customer(name="Bob", country="Canada"),
    Customer(name="Charlie", country="USA"),
    Customer(name="Diana", country="UK"),
    Customer(name="Eve", country="Germany"),
]

products = [
    Product(name="Laptop", category="Electronics", price=1200),
    Product(name="Phone", category="Electronics", price=800),
    Product(name="Desk", category="Furniture", price=300),
    Product(name="Chair", category="Furniture", price=150),
    Product(name="Printer", category="Office Supplies", price=200),
]

db.add_all(customers)
db.add_all(products)
db.commit()

sales = [
    Sales(customer_id=1, product_id=1, quantity=1, amount=1200, country="USA", quarter="Q1"),
    Sales(customer_id=2, product_id=2, quantity=2, amount=1600, country="Canada", quarter="Q1"),
    Sales(customer_id=3, product_id=3, quantity=1, amount=300, country="USA", quarter="Q2"),
    Sales(customer_id=4, product_id=4, quantity=4, amount=600, country="UK", quarter="Q2"),
    Sales(customer_id=5, product_id=5, quantity=3, amount=600, country="Germany", quarter="Q3"),
    Sales(customer_id=1, product_id=2, quantity=1, amount=800, country="USA", quarter="Q3"),
    Sales(customer_id=2, product_id=1, quantity=1, amount=1200, country="Canada", quarter="Q4"),
    Sales(customer_id=4, product_id=3, quantity=2, amount=600, country="UK", quarter="Q4"),
]

db.add_all(sales)
db.commit()
db.close()

print("Sample data inserted successfully.")