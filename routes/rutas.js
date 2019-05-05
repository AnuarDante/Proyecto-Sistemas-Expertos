var express = require('express');
require('../database');
var rauter = express.Router();
var User = require('../models/usuario');
var Proyecto = require('../models/proyecto');
var Archivo = require('../models/archivo');
var { verificarAutenticacion } = require('../helpers/autorizar');


rauter.get('/', (req, res)=>{
    res.render('index');
});

rauter.get('/login', (req, res)=>{
    res.render('login');
});

rauter.get('/compilador', verificarAutenticacion, (req, res)=>{
    res.render('compilador');
});

rauter.get('/inicio', verificarAutenticacion,(req, res)=>{
    res.render('inicio');
});

rauter.get('/perfil', verificarAutenticacion, (req, res)=>{
    res.render('perfil');
});

rauter.get('/inicio/perfil', async (req, res)=>{
    const perfil = await User.findOne({correo:req.session.correoUsuario});
    res.send(perfil);
});

rauter.put('/perfil/actualizar', async (req, res)=>{
    const {usuario, correo, password, passwordActual} = req.body;
    const editarPerfil = await User.findOne({password:passwordActual});
    if(usuario==''||correo==''||password==''||passwordActual==''){
        res.send({status:0,mensaje:'Complete todas los campos'});
    }
    else
    if(!editarPerfil){
        res.send({status:0,mensaje:'Escriba el Password Actual Correcto'});
    }else{
        User.update({_id:req.session.idUsuario},{
            usuario:usuario,
            password:password,
            correo:correo 
        });
        res.send({status:1,mensaje:'Usuario Actializado Correctamente'});
    }
});

rauter.post('/singin', async (req, res)=>{
    //console.log(req.body);
    const {password, correo}= req.body;
    var verificarCorreo = await User.findOne({correo:correo});
    var verificarPassword = await User.findOne({password:password});
    //console.log(verificarCorreo);
    //console.log(verificarPassword);
    if (verificarCorreo&&verificarPassword){//Significa que si encontro un usuario con las credenciales indicadas
        //Establecer las variables de sesion
        req.session.idUsuario = verificarCorreo._id;
        req.session.nombreUsuario = verificarCorreo.usuario;
        req.session.correoUsuario =  correo;
        res.send({status:1,mensaje:"Usuario autenticado con éxito"});
        //res.redirect('/inicio');
    }else{
        res.send({status:0,mensaje:"Correo o contraseñá invalida"});
        }
});

rauter.post('/singup', async (req, res)=>{
    //console.log(req.body);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {usuario, password, correo}= req.body;
    var emailUser = await User.findOne({correo: correo});
    if(usuario==''||password==''||correo==''){
        res.send({status:0, mensaje:'Por favor llene los campos'});
    }else
    if(password.length<=8){
        res.send({status:0, mensaje:'La contraseña tiene que ser mayor a 8 caracteres'});
    }else
    if(!re.test(correo)){
        res.send({status:0, mensaje:'El correo es incorrecto'});
    }else
    if(emailUser){
        res.send({status:0, mensaje:'El correo ya existe'});
    }else{
        var newUser = new User({usuario, password, correo});
        //newUser.password = await User.encryptPassword(password);
        await newUser.save();
        res.send({status:1, mensaje:`Usuario ${usuario} registrado correctamente`});
    }
});

rauter.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect("/login");
});

rauter.get('/inicio/proyectos', async (req, res)=>{
    var allproyectos = await Proyecto.find({user:req.session.idUsuario});
    //console.log(allproyectos);
    if(allproyectos){
        res.send(allproyectos);
    }else if(!allproyectos){res.send({status:0, mensaje:'No hay proyectos Crea uno nuevo'});}
});

rauter.post('/inicio/proyecto', async (req, res)=>{
    console.log(req.body);
    const {nombreProyecto, descripcionProyecto} = req.body;
    var newNombreProyecto = await Proyecto.findOne({nombreProyecto: nombreProyecto});
    if(nombreProyecto==''||descripcionProyecto==''){
        res.send({status:0, mensaje:'Porfavor complete los campos'});
    }else
    if(newNombreProyecto){
        res.send({status:0, mensaje:'El nombre del proyecto ya existe'});
    }else{
        var newProyecto = new Proyecto({nombreProyecto, descripcionProyecto});
        newProyecto.user = req.session.idUsuario; 
        await newProyecto.save();
        res.send({status:1, mensaje:`Proyecto ${nombreProyecto} creado correctamente`, nombre:`${nombreProyecto}`});
    }
});

rauter.get('/inicio/archivos', async (req, res)=>{
    var allArchivos = await Archivo.find({user:req.session.idUsuario});
    //console.log(allArchivos);
    if(allArchivos){
        res.send(allArchivos);
    }else{res.send('No hay archivos Crea uno nuevo');}
});

rauter.post('/inicio/archivo', async (req, res)=>{
    console.log(req.body);
    var {nombreArchivo, tipoArchivo}= req.body;
    var newNombreArchivo = await Archivo.findOne({nombreArchivo:nombreArchivo});
    console.log(newNombreArchivo);
    if(!nombreArchivo||!tipoArchivo){  
        res.send({status:0, mensaje:'Por favor complete los campos'});
    }else
    if(newNombreArchivo){
        res.send({status:0, mensaje:'El nombre del archivo ya existe'});
        res.end();
    }else{
        var newArchivo = new Archivo({nombreArchivo, tipoArchivo});
        newArchivo.user = req.session.idUsuario;
        await newArchivo.save();
        res.send({status:1, mensaje:`Archivo ${nombreArchivo} creado correctamente`});   
    }
});

rauter.post('/compilador/proyecto/html', async (req,res)=>{
    console.log(req.body);
    var {nombreArchivo, tipoArchivo, contenidoArchivo}= req.body;
    var oldArchivohtml = await Archivo.findOne({nombreArchivo:nombreArchivo});
    if(oldArchivohtml){
        res.send({status:0, mensaje:`Archivo ${nombreArchivo} ya esta creado`});    
    }else{
        var newArchivo = new Archivo({nombreArchivo, tipoArchivo, contenidoArchivo}); 
        newArchivo.user = req.session.idUsuario;
        await newArchivo.save();
        res.send({status:1, mensaje:`Archivo ${nombreArchivo} creado correctamente`});
        
    }
});

rauter.post('/compilador/proyecto/css', async (req,res)=>{
    console.log(req.body);
    var {nombreArchivo, tipoArchivo, contenidoArchivo}= req.body;
    var oldArchivocss = await Archivo.findOne({nombreArchivo:nombreArchivo});
    if(oldArchivocss){
        res.send({status:0, mensaje:`Archivo ${nombreArchivo} ya esta creado`});    
    }else{
        var newArchivocss = new Archivo({nombreArchivo, tipoArchivo, contenidoArchivo});
        newArchivocss.user = req.session.idUsuario; 
        await newArchivocss.save();
        res.send({status:1, mensaje:`Archivo ${nombreArchivo} creado correctamente`});
        
    }    
});

rauter.post('/compilador/proyecto/js', async (req,res)=>{
    console.log(req.body);
    var {nombreArchivo, tipoArchivo, contenidoArchivo}= req.body;
    var oldArchivojs = await Archivo.findOne({nombreArchivo:nombreArchivo});
    if(oldArchivojs){
        res.send({status:0, mensaje:`Archivo ${nombreArchivo} ya esta creado`});    
    }else{
        var newArchivojs = new Archivo({nombreArchivo, tipoArchivo, contenidoArchivo});
        newArchivojs.user = req.session.idUsuario; 
        await newArchivojs.save();
        res.send({status:1, mensaje:`Archivo ${nombreArchivo} creado correctamente`});
        
    }    
});

rauter.delete('/proyecto/eliminar/:id', async (req,res)=>{
    console.log(req.params.id);
    var eliminarProyecto = await Proyecto.remove({_id:req.params.id});
    if(eliminarProyecto){
        res.send({status:1,mensaje:'Proyecto eliminado correctamente'});
    }
});

rauter.delete('/archivo/eliminar/:id', async (req,res)=>{
    console.log(req.params.id);
    var eliminarArchivo = await Archivo.remove({_id:req.params.id});
    if(eliminarArchivo){
        res.send({status:1,mensaje:'Proyecto eliminado correctamente'});
    }
});

rauter.put('/editar/archivo/:id', (req,res)=>{
    //console.log(req.session.codigoUsuario);
    console.log(req.params);
    console.log(req.params.id);
    Archivo.updateMany(
        {_id:req.params.id},
        {nombreArchivo:req.body.nombreArchivo},
        {tipoArchivo:req.body.tipoArchivo})
    .then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

rauter.put('/compilador/proyecto/:id', (req,res)=>{
    //console.log(req.session.codigoUsuario);
    console.log(req.params.id);
    Proyecto.updateMany(
        {_id:req.params.id},
        {$push:{archivo:req.session.idArchivohtml}},
        {$push:{archivo:req.session.idArchivocss}},
        {$push:{archivo:req.session.idArchivojs}})
    .then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

rauter.put('/compilador/proyecto/css/:id', (req,res)=>{
    //console.log(req.session.codigoUsuario);
    //console.log(req.params.id);
    Proyecto.update(
        {_id:req.params.id},
        {$push:{archivo:req.session.idArchivocss}})
    .then(result=>{
        //console.log(data);
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});
rauter.put('/compilador/proyecto/js/:id', (req,res)=>{
    //console.log(req.session.codigoUsuario);
    //console.log(req.params.id);
    Proyecto.update(
        {_id:req.params.id},
        {$push:{archivo:req.session.idArchivojs}})
    .then(result=>{
        //console.log(data);
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

module.exports = rauter;