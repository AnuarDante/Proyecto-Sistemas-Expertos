function Editar(e,id){
    e.preventDefault();
        /*$.ajax({
            method:"POST",
            url:`/compilador/proyecto/html`,
            data:"nombreArchivo=Archivo.html&tipoArchivo=html&contenidoArchivo=<!--Contenido HTML-->",
            dataType:"json",
            success:function(res){
                if(res.status==1){
                    console.log('secreo el archivo html');
                    
                }
            },
            error:function(error){
                console.error(error);
            }
        });
        $.ajax({
            method:"POST",
            url:`/compilador/proyecto/css`,
            data:"nombreArchivo=Archivo.css&tipoArchivo=css&contenidoArchivo=/*Contenido css",
            dataType:"json",
            success:function(res){
                if(res.status==1){
                    console.log('secreo el archivo css');
                    Actualizarcss(id);
                }
            },
            error:function(error){
                console.error(error);
            }
        });
        $.ajax({
            method:"POST",
            url:'/compilador/proyecto/js',
            data:"nombreArchivo=Archivo.js&tipoArchivo=js&contenidoArchivo=/*Contenido js",
            dataType:"json",
            success:function(res){
                if(res.status==1){
                    console.log('secreo el archivo js');
                    Actualizarjs(id);
                }
            },
            error:function(error){
                console.error(error);
            }
        });*/
        location.href='/compilador';    
}


function Actualizarhtml(id){
    $.ajax({
        method:"PUT",
        url:"/compilador/proyecto/"+id,
        dataType:"json",
        success:function(res){
            console.log(res);
        },
        error:function(error){
            console.error(error);
        }
    });    
}

function Actualizarcss(id){
    $.ajax({
        method:"PUT",
        url:`/compilador/proyecto/css/`+id,
        dataType:"json",
        success:function(res){
            console.log(res);
        },
        error:function(error){
            console.error(error);
        }
    });    
    
}


    function Actualizarjs(id){ 
        $.ajax({
            method:"PUT",
            url:`/compilador/proyecto/js/`+id,
            dataType:"json",
            success:function(res){
                console.log(res);
            },
            error:function(error){
                console.error(error);
            }
        });    
    
    }
