const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const pg = require('pg');
const QueryStream = require('pg-query-stream');
const jsonStream = require('JSONStream');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'recipe_api',
  user: 'postgres',
  password: 'password',
};

const connectionString = {
  host: 'localhost',
  port: 5432,
  database: 'recipe_api',
  user: 'postgres',
  password: 'password',
};

const db = pgp(connectionString);

const newDB = new pg.Pool(config);

// query functions

function getAllRecipes(req, res, next) {
  const offset = 0;
  const limit = 12;

  db.any(`select * from recipes_recipe limit ${limit} offset ${offset}`)
  // db.any('select * from recipes_recipe')
    .then((data) => {
      res.status(200)
        // .json({
        //   status: 'success',
        //   data: data,
        //   message: 'Retrieved ALL recipes',
        // });
        .json(data);
    })
    .catch((err) => {
      return next(err);
    });
}

// function getRecipes(req, res) {
//   newDB.connect((err, client, done) => {
//     if (err) throw err;
//
//     const query = new QueryStream(`select * from recipes_recipe where title like '%${req.query.search}%'`);
//
//     const stream = client.query(query);
//
//     res.set('Content-Type', 'application/json');
//
//     stream.on('end', done);
//     stream.pipe(jsonStream.stringify()).pipe(res.status(200));
//   });
// }

function getRecipes(req, res, next) {
  const offset = req.query.offset || 0;
  const limit = 12;

  if (req.query.search) {
    db.any(`select * from recipes_recipe where title like '%${req.query.search}%' limit ${limit} offset ${offset}`)
    .then((data) => {
      res.status(200)
        .json(data);
    })
    .catch((err) => {
      return next(err);
    });
  } else {
    db.any(`select * from recipes_recipe limit ${limit} offset ${offset}`)
    .then((data) => {
      res.status(200)
        .json(data);
    })
    .catch((err) => {
      return next(err);
    });
  }
}

function searchRecipes(req, res, next) {
  db.any(`select * from recipes_recipe where title like '%${req.query.search}%'`)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    return next(err);
  });
}

function getRecipe(req, res, next) {
  db.one(`select * from recipes_recipe where id = ${req.params.id}`)
    .then((data) => {
      res.status(200)
       .json({
         status: 'success',
         data: data,
         message: 'Retrieved ONE recipe',
       });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getAllRecipes: getAllRecipes,
  getRecipes: getRecipes,
  getRecipe: getRecipe,
  searchRecipes: searchRecipes,
};
