module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ranking: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique:true,
        },
        active: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },        
    }
    let config = {
        tableName: "genres",
        timestamps: true
    }

    const Genres = sequelize.define(alias, cols, config)
    return Genres;
}