const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite", //choose sql to talk with
  storage: "./Database/Movies.sqlite",
});

const Movies = sequelize.define("movie", {
  movie_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  director: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  release_date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  running_time: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  imageFile: {
    type: Sequelize.STRING,
    defaultValue: "600x300.png",
    allowNull: true,
  },
  teaser_url: {
    type: Sequelize.STRING,
    defaultValue: "https://www.youtube.com/watch?v=Gu6btHfa0wI",
    allowNull: true,
  },
});

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roles: {
    type: Sequelize.STRING,
    defaultValue: "User",
    allowNull: false,
  },
  profilePicture: {
    type: Sequelize.STRING,
    defaultValue: "noimage.jpg",
    allowNull: true,
  },
});

const Favorite = sequelize.define("favorite", {
  fmovie_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
});

const Review = sequelize.define("review", {
  review_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

sequelize.sync(); //if table not exist create

app.get("/movies", (req, res) => {
  Movies.findAll() //select * from
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/movieupdate/", (req, res) => {
  Movies.findAll() //select * from
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/moviedelete/", (req, res) => {
  Movies.findAll() //select * from
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/movie/:id", (req, res) => {
  Movies.findByPk(req.params.id)
    .then((movie) => {
      Review.findAll({ where: { movie_id: req.params.id } }).then((review) => {
        User.findAll().then((users) => {
          let ar = [review, movie, users];
          console.log(review, movie, users);
          res.json(ar);
        });
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}...`)
);
