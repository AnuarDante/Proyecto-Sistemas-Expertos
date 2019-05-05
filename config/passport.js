/*var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/usuario');

module.exports=passport.use(new localStrategy ({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (correo, password, done) => { 
    var user = await User.findOne({correo:correo});
    if(!user){
        return done(null, false, {mensaje: 'Usuario no encontrado'});
    }else{
        var match = await User.findOne({password:password});
        //var match= await user.matchPassword(password);
    }if(match){
        return done(null, user);
    }else{
        return done(null, false, {mensaje:'Contraseña Incorrecta'});
    }    
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((user, done) =>{
    user.findById(id, (err, user)=>{
        done(err, user);
    });
});*/

