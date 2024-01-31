-- Utilisateurs
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

-- Administrateurs
CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(id)
);

-- Listings
CREATE TABLE Listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- Bookings
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    listing_id INT,
    renter_id INT,
    FOREIGN KEY (listing_id) REFERENCES Listings(id),
    FOREIGN KEY (renter_id) REFERENCES Users(id)
);

-- Favorites
CREATE TABLE Favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    listing_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (listing_id) REFERENCES Listings(id)
);

-- Images
CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    listing_id INT,
    FOREIGN KEY (listing_id) REFERENCES Listings(id)
);

-- Amenities
CREATE TABLE Amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Reviews
CREATE TABLE Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2, 1),
    comment TEXT,
    listing_id INT,
    author_id INT,
    FOREIGN KEY (listing_id) REFERENCES Listings(id),
    FOREIGN KEY (author_id) REFERENCES Users(id)
);


-- Ajouter des utilisateurs
INSERT INTO Users (name, firstname, email, hashed_password) VALUES
    ('John Doe', 'John', 'john.doe@example.com', 'hashedpass1'),
    ('Alice Smith', 'Alice', 'alice.smith@example.com', 'hashedpass2'),
    ('Bob Brown', 'Bob', 'bob.brown@example.com', 'hashedpass3'),
    ('Emma Johnson', 'Emma', 'emma.johnson@example.com', 'hashedpass4'),
    ('Chris Davis', 'Chris', 'chris.davis@example.com', 'hashedpass5'),
    ('Eva Taylor', 'Eva', 'eva.taylor@example.com', 'hashedpass6'),
    ('Mike Martin', 'Mike', 'mike.martin@example.com', 'hashedpass7'),
    ('Olivia Adams', 'Olivia', 'olivia.adams@example.com', 'hashedpass8'),
    ('Tom Wilson', 'Tom', 'tom.wilson@example.com', 'hashedpass9'),
    ('Sophie Clark', 'Sophie', 'sophie.clark@example.com', 'hashedpass10');

-- Ajouter des administrateurs
INSERT INTO Admins (UserID) VALUES (1), (2), (3);

-- Ajouter des annonces
INSERT INTO Listings (title, description, price, owner_id) VALUES
    ('Appartement spacieux', 'Bel appartement avec vue magnifique.', 150.00, 1),
    ('Maison familiale', 'Maison parfaite pour une famille.', 200.00, 2),
    ('Studio en centre-ville', 'Studio moderne près de toutes commodités.', 100.00, 3),
    ('Chalet rustique', 'Ambiance chaleureuse au cœur de la nature.', 180.00, 4),
    ('Penthouse de luxe', 'Vue panoramique et équipements haut de gamme.', 300.00, 5),
    ('Villa en bord de mer', 'Accès direct à la plage et piscine privée.', 250.00, 6),
    ('Loft industriel', 'Espace ouvert avec design industriel.', 120.00, 7),
    ('Cabane dans les bois', 'Retraite paisible entourée de nature.', 90.00, 8),
    ('Maison d''architecte', 'Design contemporain et luminosité.', 220.00, 9),
    ('Château historique', 'Expérience royale dans un château du XVIIe siècle.', 500.00, 10);

-- Ajouter des réservations
INSERT INTO Bookings (start_date, end_date, listing_id, renter_id) VALUES
    ('2024-02-01', '2024-02-07', 1, 2),
    ('2024-03-15', '2024-03-20', 2, 3),
    ('2024-04-10', '2024-04-15', 3, 1),
    ('2024-05-05', '2024-05-12', 4, 5),
    ('2024-06-20', '2024-06-30', 5, 6),
    ('2024-08-01', '2024-08-10', 6, 7),
    ('2024-09-15', '2024-09-20', 7, 8),
    ('2024-10-10', '2024-10-18', 8, 9),
    ('2024-11-25', '2024-11-30', 9, 10),
    ('2025-01-02', '2025-01-10', 10, 1);

-- Ajouter des favoris
INSERT INTO Favorites (user_id, listing_id) VALUES
    (1, 2),
    (2, 3),
    (3, 1),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (9, 10),
    (10, 1);

-- Ajouter des images
INSERT INTO Images (url, listing_id) VALUES
    ('https://example.com/image1.jpg', 1),
    ('https://example.com/image2.jpg', 2),
    ('https://example.com/image3.jpg', 3),
    ('https://example.com/image4.jpg', 4),
    ('https://example.com/image5.jpg', 5),
    ('https://example.com/image6.jpg', 6),
    ('https://example.com/image7.jpg', 7),
    ('https://example.com/image8.jpg', 8),
    ('https://example.com/image9.jpg', 9),
    ('https://example.com/image10.jpg', 10);

-- Ajouter des équipements
INSERT INTO Amenities (name) VALUES
    ('Wifi'),
    ('Parking'),
    ('Cuisine équipée'),
    ('Piscine'),
    ('Jacuzzi'),
    ('Balcon'),
    ('Jardin'),
    ('Salle de sport'),
    ('Sauna'),
    ('Vue panoramique');

-- Ajouter des évaluations
INSERT INTO Reviews (rating, comment, listing_id, author_id) VALUES
    (4.5, 'Super endroit, je le recommande vivement.', 1, 2),
    (3.0, 'Bien mais quelques améliorations nécessaires.', 2, 3),
    (5.0, 'Parfait en tout point.', 3, 1),
    (4.2, 'Un endroit magique avec une vue exceptionnelle.', 4, 5),
    (4.8, 'Expérience de luxe inoubliable.', 5, 6),
    (3.5, 'Besoin d''un entretien plus fréquent.', 6, 7),
    (4.9, 'Idéal pour une escapade romantique.', 7, 8),
    (4.0, 'Espace moderne et bien aménagé.', 8, 9),
    (4.7, 'Hôte très accueillant, séjour agréable.', 9, 10),
    (4.6, 'Vivre comme un roi dans un château.', 10, 1);
