const db = require('../database/models/index.js')
const {Op} = require("sequelize");

module.exports={
    list: (req,res)=>{
        db.Movies.findAll()
         .then(movies=> {
            res.render('moviesList',{movies:movies})
        })
    },
    detail: (req,res)=>{
        db.Movies.findByPk(req.params.id)
            .then(movies=>{
                res.render ("moviesDetail", {movie:movie})
            })
    },
    new: (req,res)=>{
        db.Movies.findAll({
            order:[
                ['release_date','ASC']
            ]
        })
    },
    recommended: (req,res)=>{
        db.Movies.findAll({
            where:{
               rating: {[Op.gt]:5}
            },
            limit:5
        })
    }
}