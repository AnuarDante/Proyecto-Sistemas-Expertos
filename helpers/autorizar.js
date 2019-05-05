
const helpers = {};

///Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
helpers.verificarAutenticacion = (req, res, next)=>{
	if(req.session.correoUsuario)
		return next();
	else
        res.redirect('/login');
};

module.exports = helpers;