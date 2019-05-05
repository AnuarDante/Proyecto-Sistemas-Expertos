var express = require("express"); //Importar el framework express
var methodOverride = require("method-override"); 
var session = require("express-session");
var bodyParser = require('body-parser');
var flash = require('connect-flash')
var passport = require('passport');

//Initializations
var app = express(); //Inicializar la aplicacion con express
require('./database');
//require('./config/passport');

//Settings
app.set('views', './public/vistas');
app.set('view engine', 'ejs');


//Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({
        secret: 'asd.456',
        resave: true,
        saveUninitialized: true     
}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

//Routes
app.use(require('./routes/rutas'));

//Global variables



//Static Files
app.use(express.static("public")); //Publicar un directorio de archivos estaticos


//Server is Listennig
app.listen(3333);//Levantar el servidor y escuchar en el puerto indicado
console.log("EL servidor fue lenvantado");


