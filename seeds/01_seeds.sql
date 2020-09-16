INSERT INTO users (name, email, password)
VALUES ('Billiam Sharkspear', 'gotcha@wahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jace Beleren', 'planesrunner@azorius.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chandra Nalaar', 'burnbabyburn@kaladesh.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rowan Kenrith', 'betterhalf@eldrain.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lukka', 'wereallmonsters@ikoria.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Plains of Midsummer', 'Full of sharkmen and tents made from not-sharkmen', 'http://www.artofmtg.com/wp-content/uploads/2019/09/Plains-1-Throne-of-Eldraine-MtG-Art.jpg?auto=compress&cs=tinysrgb&h=350', 'http://www.artofmtg.com/wp-content/uploads/2019/09/Plains-1-Throne-of-Eldraine-MtG-Art.jpg', 0, 8000, 8000, 8000,'Eldrain','50 Main Road', 'Ardenvale', 'The Realm', '010101', true),
(2, 'Silmots Best Hideaway', 'Come see our fantastic mage-rings, crafted by only the finest Gruul-clan ringmages', 'https://media.wizards.com/2015/images/daily/cardart_C2dgxJL9kA.jpg?auto=compress&cs=tinysrgb&h=350', 'https://media.wizards.com/2015/images/daily/cardart_C2dgxJL9kA.jpg', 120, 1, 2, 2, 'Vryn','666 Mindmage Thoroughfare', 'Silmots Crossing', 'Ampryn', '0721', true),
(5, 'The Best Place to Hang Your Coppercoat', 'Totally safe, those rumours about monsters are total fabrications! - General Kudro', 'http://www.artofmtg.com/wp-content/uploads/2020/04/Valiant-Rescuer-Ikoria-MtG-Art.jpg?auto=compress&cs=tinysrgb&h=350', 'http://www.artofmtg.com/wp-content/uploads/2020/04/Valiant-Rescuer-Ikoria-MtG-Art.jpg', 80, 0, 1, 1, 'Ikoria','1 Kudro Grand Boulevard', 'Drannith', 'Egali', '9999', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-01-13','2020-03-12', 2, 4),
('1000-07-23','5020-12-29', 3, 3),
('2020-09-03','2021-02-10', 1, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 2, 1, 4, 'Very friendly ring-mages, once they learn you can zap them if they get too close'),
(3, 3, 2, 1, 'Regardless of what the ad said, there were monster attacks pretty much constantly.'),
(2, 1, 3, 3, 'Needs more sharkmen.');