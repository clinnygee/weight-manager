const conn = require('../connection');
const bcrypt = require('bcrypt');

const {Sequelize} = conn;

const User = conn.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false, 
    }, 
    male: {
        type: Sequelize.BOOLEAN,
        required: true,
    },
    birthdate: {
        type: Sequelize.DATE, 
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
});

User.createUser =  (username, password, saltRounds) => {
    let userObject = null;
    return bcrypt.hash(password, saltRounds).then(hash => {
        return User.create({
            username: username,
            password: hash,
            // profileImgUrl: profileImg ? profileImg : 'https://picsum.photos/100',
        })
    });
    
    return userObject;
}

module.exports= User;