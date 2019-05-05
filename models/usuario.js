var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../database');
var {Schema} = mongoose;

// campos del usuario
var UserSchema = new Schema({
    correo: {type:String, required: true},
    password:{type:String, require: true},
    usuario:{type:String,required: true},
    fecha: {type:Date, default:Date.now},
    imagen: {type:String}
});

//metodo para sifrar contraseñas
UserSchema.method.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//metodo para desifrar las contraseñas
UserSchema.method.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('Usuarios', UserSchema);