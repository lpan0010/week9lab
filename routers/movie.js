var Actor = require("../models/actor");
var Movie = require("../models/movie");
const mongoose = require("mongoose");
module.exports = {
  getAll: function (req, res) {
    Movie.find({})
      .populate("actors")
      .exec(function (err, movies) {
        if (err) return res.status(400).json(err);
        res.json(movies);
      });
  },
  getBetween: function (req, res) {
    Movie.find({})
      .where("year")
      .gte(parseInt(req.params.year1))
      .lte(parseInt(req.params.year2))
      .exec(function (err, movies) {
        if (err) return res.status(400).json(err);
        res.json(movies);
      });
  },
  createOne: function (req, res) {
    let newMovieDetails = req.body;
    newMovieDetails._id = new mongoose.Types.ObjectId();
    Movie.create(newMovieDetails, function (err, movie) {
      if (err) return res.status(400).json(err);
      res.json(movie);
    });
  },
  getOne: function (req, res) {
    Movie.findOne({ _id: req.params.id })
      .populate("actors")
      .exec(function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        res.json(movie);
      });
  },
  updateOne: function (req, res) {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (
      err,
      movie
    ) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      res.json(movie);
    });
  },
  deleteOne: function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) {
        console.log(req.params.id);
        return res.status(404).json();
      }

      if (movie.actors.length > 0) {
        for (let i; i < movie.actors; i++) {
          Actor.findOne({ _id: movie.actors[i] }, function (err, actor) {
            console.log(actor);
            if (err) {
              return res.status(400).json(err);
            }
            if (!actor) return res.status(404).json();
            const index = actor.movies.indexOf(req.params.movieid);
            actor.movies.splice(index, 1);
            actor.save(function (err) {
              if (err) return res.status(500).json(err);
            });
          });
        }
      }
      Movie.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
          return res.status(400).json(err);
        }
        res.json();
      });
    });
  },
  addActor: function (req, res) {
    Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      Actor.findOne({ _id: req.body._id }, function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        movie.actors.push(actor._id);
        movie.save(function (err) {
          if (err) return res.status(500).json(err);
          res.json(movie);
        });
      });
    });
  },
  deleteActor: function (req, res) {
    Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
      const index = movie.actors.indexOf(req.params.actorid);
      console.log(movie.actors);
      movie.actors.splice(index, 1);
      movie.save(function (err) {
        if (err) return res.status(500).json(err);
        res.json();
      });
    });
  },
  deleteBefore: function (req, res) {
    Movie.deleteMany(
      {
        year: {
          $lt: parseInt(req.body.year),
        },
      },
      function (err, movies) {
        for (let i; i < movies.length; i++) {
          this.deleteOne(movies[i]);
        }

        if (err) return res.status(400).json(err);
        res.json(movies);
      }
    );
  },
};
