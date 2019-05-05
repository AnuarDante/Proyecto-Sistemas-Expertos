var mongoose = require('mongoose');
require('../database');
var {Schema} = mongoose;

// campos del usuario
var UserSchema = new Schema({
    nombreArchivo: {type:String, require: true},
    tipoArchivo: {type:String, require: true},
    contenidoArchivo:{type:String},
    user:{type:String},
    fecha: {type:Date, default:Date.now}
});


module.exports = mongoose.model('Archivos', UserSchema);