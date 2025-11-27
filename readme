# Inventory Management System

A backend API built with Node.js, Express, and PostgreSQL for managing products, suppliers, and their relationships.

## Features
- Full CRUD for products
- Full CRUD for suppliers
- SQL relations (products → suppliers)
- JOIN queries
- Input validation
- Error handling
- Clear folder structure (repository pattern + router modules)

## Test data for suppliers table in SQL: 
```sql
INSERT INTO suppliers (supplier_name, contact_person, email, phone_number, country) VALUES
('Nordic Foods AB', 'Elin Åkesson', 'elin@nordicfoods.se', '+46701234501', 'Sweden'),
('Fresh Harvest Co', 'Mats Lind', 'mats@freshharvest.eu', '+46701234502', 'Denmark'),
('Green Valley Imports', 'Sara Holmqvist', 'sara@gvi.com', '+46701234503', 'Germany'),
('Oceanic Trade Group', 'Jonas Persson', 'jonas@oceanictrade.net', '+46701234504', 'Norway'),
('Sunrise Global', 'Emma Ström', 'emma@sunriseglobal.com', '+46701234505', 'Finland'),
('Pure Organic Supply', 'David Larsson', 'david@pureorganic.org', '+46701234506', 'Netherlands'),
('Golden Fields Ltd', 'Anna Berg', 'anna@goldenfields.co.uk', '+447700900601', 'United Kingdom'),
('EuroFresh Wholesale', 'Lina Evertsson', 'lina@eurofresh.eu', '+46701234507', 'Belgium'),
('EcoChoice Partners', 'Oscar Hede', 'oscar@ecochoice.com', '+46701234508', 'France'),
('NordImport Solutions', 'Julia Norén', 'julia@nordimport.se', '+46701234509', 'Sweden'),
('Balkan Market Export', 'Milo Vukovic', 'milo@balkanexport.rs', '+381612345900', 'Serbia'),
('Mediterranean Finest', 'Catalina Rossi', 'catalina@medfin.it', '+390612349900', 'Italy'),
('Global Farm Supply', 'Peter Johansson', 'peter@gfs.com', '+46701234510', 'Sweden'),
('Alpine Goods Trading', 'Greta Müller', 'gmuller@alpinegoods.at', '+4372012301', 'Austria'),
('Baltic Fresh AB', 'Erik Vester', 'erik@balticfresh.lv', '+37122123456', 'Latvia');
```

## Test data for products table in SQL: 
```sql
INSERT INTO products (title, quantity, price, category, supplier_id) VALUES
('Organic Oat Milk 1L', 120, 24.90, 'Dairy Alternatives', 1),
('Wholegrain Pasta 500g', 200, 18.90, 'Dry Goods', 2),
('Fresh Strawberries 500g', 90, 34.00, 'Fruits', 3),
('Frozen Berry Mix 1kg', 150, 49.00, 'Frozen', 4),
('Canned Tomatoes 400g', 300, 12.50, 'Canned Goods', 5),
('Extra Virgin Olive Oil 750ml', 110, 79.00, 'Oils', 6),
('Almond Butter 350g', 80, 69.50, 'Dry Goods', 7),
('Chocolate Chip Cookies 250g', 160, 22.00, 'Snacks', 8),
('Sparkling Water Lime 1.5L', 250, 14.90, 'Beverages', 9),
('Greek Yogurt 1kg', 100, 42.00, 'Dairy', 10),

('Butter Croissants 4-pack', 60, 29.90, 'Bakery', 11),
('Frozen Spinach 800g', 180, 19.50, 'Frozen', 12),
('Red Onions 1kg', 220, 15.00, 'Vegetables', 13),
('Premium Ground Coffee 500g', 140, 89.00, 'Beverages', 14),
('Organic Free-Range Eggs 12-pack', 100, 39.00, 'Dairy', 15),

('Fresh Salmon Fillets 500g', 70, 119.00, 'Meat & Fish', 1),
('Whole Chicken 1.2kg', 50, 79.50, 'Meat & Fish', 2),
('Granola Crunch 500g', 130, 49.00, 'Dry Goods', 3),
('Vanilla Ice Cream 1L', 90, 54.90, 'Frozen', 4),
('Large Avocados (2-pack)', 150, 29.00, 'Fruits', 5),

('Mango Chutney 200g', 100, 25.00, 'Condiments', 6),
('Penne Rigate 1kg', 180, 22.00, 'Dry Goods', 7),
('Sweet Corn 340g', 140, 11.90, 'Canned Goods', 8),
('Fresh Blueberries 250g', 75, 32.00, 'Fruits', 9),
('Soft Tortillas 8-pack', 95, 24.90, 'Bakery', 10),

('Tomato Salsa 300g', 130, 19.00, 'Condiments', 11),
('Protein Bars Box (12-pack)', 60, 159.00, 'Snacks', 12),
('Apple Juice 1L', 200, 19.90, 'Beverages', 13),
('Broccoli 500g', 180, 17.00, 'Vegetables', 14),
('Bananas 1kg', 250, 18.00, 'Fruits', 15),

('Marinated Olives 250g', 70, 38.90, 'Snacks', 1),
('Herbal Tea Selection 20-pack', 120, 37.00, 'Beverages', 2),
('Peanut Butter Crunchy 500g', 90, 59.00, 'Dry Goods', 3),
('Fresh Basil 30g', 150, 17.50, 'Herbs', 4),
('Cinnamon Rolls 6-pack', 110, 33.00, 'Bakery', 5),

('Rice Cakes 125g', 170, 12.00, 'Snacks', 6),
('Tomato Ketchup 1kg', 200, 29.00, 'Condiments', 7),
('Frozen Mango Cubes 1kg', 130, 44.00, 'Frozen', 8),
('Mozzarella Cheese 300g', 100, 39.90, 'Dairy', 9),
('Chocolate Hazelnut Spread 400g', 140, 32.00, 'Snacks', 10),

('Chili Flakes 50g', 160, 14.00, 'Herbs & Spices', 11),
('Coconut Milk 400ml', 190, 16.90, 'Canned Goods', 12),
('Fresh Apples 1kg', 200, 22.00, 'Fruits', 13),
('Baby Spinach 150g', 110, 24.50, 'Vegetables', 14),
('Sunflower Seeds 300g', 130, 21.00, 'Dry Goods', 15);
