const db = require('../database/models/index.js')
const {Op} = require("sequelize");

module.exports={
    list: (req,res)=>{
        db.Movies.findAll()
         .then(resultado=> {
            res.render('moviesList',{movies:resultado})
        })
    },
    detail: (req,res)=>{
        db.Movies.findByPk(req.params.id)
            .then(resultado=>{
                res.render ("moviesDetail", {movie:resultado})
            })
    },
    new: (req,res)=>{
        db.Movies.findAll({
            order:[
                ['release_date','DESC']
            ]
        })
        .then(resultado=>{
            res.render('newestMovies',{movies:resultado})
        })
    },
    recommended: (req,res)=>{
        db.Movies.findAll({          
            order:[
                ['rating','ASC']
            ],
            limit:5,
            where : {
                rating: {[Op.gt]:8}
            }
        })
        .then(resultado=>{
            res.render('recommendedMovies',{movies:resultado})
        })
    }
}