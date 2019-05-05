var mongoose = require('mongoose');
require('../database');
var {Schema} = mongoose;

// campos del usuario
var UserSchema = new Schema({
    nombreProyecto:{type:String, require: true},
    descripcionProyecto:{type:String, require: true},
    fecha: {type:Date, default:Date.now},
    user: {type:String},
    archivo:{type:Array}
});


module.exports = mongoose.model('Proyectos', UserSchema);