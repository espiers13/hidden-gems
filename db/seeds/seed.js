const format = require("pg-format");
const db = require("../connection.js");
const { formatGemsData, convertTimestampToDate } = require("./utils.js");

const seed = ({ gemsData, usersData, commentsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS gems;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            username VARCHAR NOT NULL UNIQUE,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            avatar_url TEXT DEFAULT 'https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/avatars%2FJohn%20Doe.png?alt=media&token=c19e3cb9-6890-498d-b0be-4ec63e24ed11',
            user_type VARCHAR DEFAULT 'regular'
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE gems (
            gem_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            category VARCHAR NOT NULL,
            img_url VARCHAR[] DEFAULT array['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-tQciY90p_grchQZkdICyzAGcdTYsRDfjw&s']::varchar[],
            latitude FLOAT,
            longitude FLOAT,
            address VARCHAR NOT NULL,
            date TIMESTAMP DEFAULT NULL,
            rating INT[] DEFAULT array[]::int[],
            type VARCHAR NOT NULL,
            user_id INT REFERENCES users(user_id)
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            username VARCHAR REFERENCES users(username),
            body VARCHAR NOT NULL,
            gem_id INT REFERENCES gems(gem_id),
            date TIMESTAMP DEFAULT NOW()
        );`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (name, username, email, password, avatar_url, user_type) VALUES %L RETURNING *;",
        usersData.map(
          ({ name, username, email, password, avatar_url, user_type }) => [
            name,
            username,
            email,
            password,
            avatar_url,
            user_type,
          ]
        )
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const formattedGemsData = gemsData.map(formatGemsData);
      const insertGemsQueryStr = format(
        "INSERT INTO gems (title, description, category, img_url, latitude, longitude, address, date, rating, type, user_id) VALUES %L RETURNING *;",
        formattedGemsData.map(
          ({
            title,
            description,
            category,
            img_url,
            latitude,
            longitude,
            address,
            date,
            rating,
            type,
            user_id,
          }) => [
            title,
            description,
            category,
            img_url,
            latitude,
            longitude,
            address,
            date,
            rating,
            type,
            user_id,
          ]
        )
      );
      return db.query(insertGemsQueryStr);
    })
    .then(() => {
      const formattedCommentsData = commentsData.map(convertTimestampToDate);
      const insertCommentsDataStr = format(
        "INSERT INTO comments (username, body, gem_id, date) VALUES %L;",
        formattedCommentsData.map(({ username, body, gem_id, date }) => [
          username,
          body,
          gem_id,
          date,
        ])
      );
      return db.query(insertCommentsDataStr);
    });
};

module.exports = seed;
