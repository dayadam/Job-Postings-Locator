module.exports = function(sequelize, DataTypes) {
    const Search = sequelize.define("Search", {
        search: {
            type: DataTypes.STRING,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false
        },

        jobs: {
            type: DataTypes.TEXT
        }
    });

    return Search;
};