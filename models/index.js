const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'database.sqlite'),
});

// Define models        
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const BusinessCard = sequelize.define('BusinessCard', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
    },
    profile_picture: {
        type: DataTypes.STRING,
    },
    social_media: {
        type: DataTypes.JSON,
    },
    products_services: {
        type: DataTypes.JSON,
    },
    card_url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
});

BusinessCard.hasMany(Product);
Product.belongsTo(BusinessCard);

sequelize.sync();

module.exports = {
    sequelize,
    User,
    BusinessCard,
    Product,
};