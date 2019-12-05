module.exports = function(sequelize, DataTypes) {
    const Search = sequelize.define("Search", {
        search: {
            type: DataTypes.STRING,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        jobs: {
            type: DataTypes.TEXT
        }
    });

    return Search;
};