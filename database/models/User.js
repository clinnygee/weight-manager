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
    // profileImgUrl: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: 'https://picsum.photos/100',
    // },
    about: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
    },
    male: {
        type: Sequelize.BOOLEAN,
        required: true,
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