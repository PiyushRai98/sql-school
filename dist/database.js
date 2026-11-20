export const seed = `
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT, country TEXT);
INSERT INTO customers VALUES (1,'Ava','London','UK'),(2,'Noah','Mumbai','India'),(3,'Mia','Berlin','Germany'),(4,'Leo','London','UK'),(5,'Zara','Delhi','India'),(6,'Kai','Tokyo','Japan');
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT, price REAL CHECK(price >= 0));
INSERT INTO products VALUES (1,'Notebook','Stationery',12),(2,'Desk lamp','Lighting',45),(3,'Backpack','Accessories',65),(4,'Coffee mug','Kitchen',18),(5,'Headphones','Electronics',89),(6,'Plant pot','Home',24),(7,'Pencil set','Stationery',8),(8,'Keyboard','Electronics',75);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), product_id INTEGER REFERENCES products(id), quantity INTEGER, status TEXT, ordered_at TEXT);
INSERT INTO orders VALUES (1,1,1,3,'delivered','2026-01-03'),(2,2,3,1,'delivered','2026-01-05'),(3,1,2,1,'shipped','2026-01-08'),(4,3,4,2,'delivered','2026-01-10'),(5,4,5,1,'pending','2026-01-11'),(6,2,1,5,'delivered','2026-02-02'),(7,5,6,2,'shipped','2026-02-06'),(8,3,7,4,'delivered','2026-02-09'),(9,4,8,1,'cancelled','2026-02-12'),(10,1,4,2,'delivered','2026-03-01'),(11,5,2,1,'pending','2026-03-04'),(12,2,5,1,'shipped','2026-03-05');
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary INTEGER, manager_id INTEGER REFERENCES employees(id));
INSERT INTO employees VALUES (1,'Alex','Engineering',120000,NULL),(2,'Sam','Engineering',85000,1),(3,'Jordan','Design',95000,1),(4,'Taylor','Design',72000,3),(5,'Morgan','Sales',90000,1),(6,'Casey','Sales',65000,5),(7,'Riley','Engineering',85000,1),(8,'Drew','Support',60000,5);
`;
export const tables={products:['id','name','category','price'],customers:['id','name','city','country'],orders:['id','customer_id','product_id','quantity','status','ordered_at'],employees:['id','name','department','salary','manager_id']};
