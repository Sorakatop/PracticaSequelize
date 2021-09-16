module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        release_date: {
            type: dataTypes.DATE,
        },
        length: {
            type: dataTypes.INTEGER(10).UNSIGNED,            
        },
        genre_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,            
        },
    }
    let config = {
        tableName: "movies",
        timestamps: true
    }

    const Movies = sequelize.define(alias, cols, config)
    Movies.associate = models => {
        Movies.belongsTo(models.Genres, {
            as: "Genres",
            foreignKey: "genre_id"
        })
    }
    return Movies;
}