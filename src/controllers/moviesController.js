const db = require('../database/models/index.js')
const {Op} = require("sequelize");
//Otra forma de llamar a los modelos
const Movies = db.Movie;

module.exports={
    list: (req,res)=>{
        Movies.findAll()
         .then(resultado=> {
            res.render('moviesList',{movies:resultado})
        })
    },
    detail: (req,res)=>{
        Movies.findByPk(req.params.id)
            .then(resultado=>{
                res.render ("moviesDetail", {movie:resultado})
            })
    },
    new: (req,res)=>{
        Movies.findAll({
            order:[
                ['release_date','DESC']
            ]
        })
        .then(resultado=>{
            res.render('newestMovies',{movies:resultado})
        })
    },
    recommended: (req,res)=>{
        Movies.findAll({          
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
    },
    add:(req, res)=> {
        res.render('moviesAdd')   
    },
    create:(req, res)=> {
        const {
            title,
            rating,
            awards,
            release_date,
            length
        } = req.body

        Movies.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(error => console.log(error))
    },
    edit: function(req, res) {
        // TODO
    },
    update: function (req,res) {
        const{
            title,
            rating,
            awards,
            release_date,
            length
        } = req.body;
        Movies.update({
            title,
            rating,
            awards,
            release_date,
            length
        },{
            where:{id:+req.params.id}
        })
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(err=>console(err))
    },
    delete: function (req, res) {
        // TODO
        Movies.findByPk(+req.params.id)
        .then(Movie=>{
            res.render('moviesDelete',{Movie})
        })
    },
    destroy: function (req, res) {
        // TODO
        Movies.destroy({
            where: {id:+req.params.id}
        })
        .then(()=>{
            res.redirect('/movies')
        }).catch(err=>console(err))
    }
}