const { Pool } = require('pg');
const properties = require('./json/properties.json');
//const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users 
  WHERE email = $1`
  , [`${email}`])
    .then((res) => {
      //console.log(res.rows)
      return res.rows[0];
    })
    .catch(err => error);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1`, [`${id}`])
    .then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [`${user.name}`, `${user.email}`, `${user.password}`])
    .then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) { //query taken from 5_my_reservations
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(rating) as avg_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND end_date < NOW()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2
  `, [`${guest_id}`, `${limit}`])
    .then(res => res.rows); //not rows[0] like the others because you want all the entries.
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  //1 holds options
  const queryParams = [];

  //2 start of sql query
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `
  }

  //3.1 city search option in sql query extra statement to combine search params
  if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `AND city LIKE $${queryParams.length} `;
  }

  //3.3 min cost per night
  if (options.minimum_price_per_night) {
      queryParams.push(Number(options.minimum_price_per_night) * 100); //because if there is ALREADY a length, then this means the next addition is the right $number
      queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  //3.4 max cost per night
  if (options.maximum_price_per_night) {
      queryParams.push(Number(options.maximum_price_per_night) * 100);
      queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  //4.1 split to make room for HAVING
  queryString += `
  GROUP BY properties.id `;//this friggen space ruined it all for 15 minutes

  //3.5 minimum rating moved down because of the neceessity of the HAVING statement. Remember, HAVING for aggregate sorts
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(rating) >= $${queryParams.length} `;
  }

  //4.2 adds limit as $2/3/4 whatever since it should be last, along with order by syntax.
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  //5 checking in console.
  console.log("qs: \n", queryString, "\n qP: \n", queryParams);

  //6 actual query promise
  return pool.query(queryString, queryParams)
    .then(res => {
      console.log("RES: \n", res.rows)
      return res.rows});
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *;`, 
  [`${property.owner_id}`, `${property.title}`, `${property.description}`, `${property.thumbnail_photo_url}`, `${property.cover_photo_url}`, `${property.cost_per_night}`, `${property.street}`, `${property.city}`, `${property.province}`, `${property.post_code}`, `${property.country}`, `${property.parking_spaces}`, `${property.number_of_bathrooms}`, `${property.number_of_bedrooms}`])
  .then(res => res.rows[0])
}


exports.addProperty = addProperty;