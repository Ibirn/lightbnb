SELECT reservations.*, properties.id, properties.title, properties.cost_per_night, AVG(rating) as avg_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1 AND end_date < NOW()
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10