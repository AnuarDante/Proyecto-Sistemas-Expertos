

$("#btncrearproyecto").click(function(e){
    e.preventDefault();
	var parametro = `nombreProyecto=${$("#form2").val()}&descripcionProyecto=${$("#form3").val()}`;
	console.log(parametro);
	$.ajax({
        method:"POST",
        url:"/inicio/proyecto",
        data:parametro,
		dataType:"json",
		success:function(res){
            console.log(res);
                if(res.status==0){
                    $("#errorProyecto").html('');
                    $("#errorProyecto").append(`<div class="alert alert-danger" role="alert">
                    ${res.mensaje}
                    </div>`);
                }
                if(res.status==2){
                    $("#errorProyecto").html('');
                    $("#errorProyecto").append(`<div class="alert alert-danger" role="alert">
                    ${res.mensaje}
                    </div>`);
                }
                if(res.status==1){
                    $("#errorProyecto").html('');
                    $("#errorProyecto").append(`<div class="alert alert-primary" role="alert">
                    ${res.mensaje}
                    </div>`);    
                    $("#crearProyectos").append(
                        `<div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Proyecto</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res.nombre}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-folder fa-2x text-gray-300"></i>
                                        </div>
                                        <div class="text-xs mt-1 mb-n3"><a href="" onclick="verMas(event, '${res._id}')" data-toggle="modal" data-target="#modalArchivoProyecto">Ver más</a> | <a href="" onclick="eliminar(event, '${res._id}')">Eliminar</a>
                                            | <a href="/compilador" onclick="Editar(event, '${res._id}')">Editar</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
                    obtenerProyectos();
                }
		},
		error:function(error){
			console.error(error);
		}
	});
});

$("#btncreararchivo").click(function(e){
    e.preventDefault();
	var parametro = `nombreArchivo=${$("#form4").val()}&tipoArchivo=${$("#form5").val()}`;
	console.log(parametro);
	$.ajax({
        method:"POST",
        url:"/inicio/archivo",
        data:parametro,
		dataType:"json",
		success:function(res){
            console.log(res);
                if(res.status==0){
                    $("#errorArchivo").html('');
                    $("#errorArchivo").append(`<div class="alert alert-danger" role="alert">
                    ${res.mensaje}
                    </div>`);
                }
                if(res.status==1){
                    $("#errorArchivo").html('');
                    $("#errorArchivo").append(`<div class="alert alert-primary" role="alert">
                    ${res.mensaje}
                    </div>`);    
                    $("#crearArchivos").append(
                        `<div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Archivo</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res.nombre}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-file fa-2x text-gray-300"></i>
                                        </div>
                                        <div class="text-xs mt-1 mb-n3"><a href="" onclick="verMas(event, '${res._id}')" data-toggle="modal" data-target="#modalArchivoProyecto">Ver más</a> | <a href="" onclick="eliminar(event, '${res._id}')">Eliminar</a>
                                            | <a href="/compilador" onclick="Editar(event, '${res._id}')">Editar</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
                    obtenerArchivos();
                }
		},
		error:function(error){
			console.error(error);
		}
	});
});

function obtenerProyectos(){
    $.ajax({
        url:"/inicio/proyectos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            $("#crearProyectos").html('');
            if(res.length==0){
                $("#crearProyectos").append('No hay proyectos Crea uno nuevo');
            }else{
                for(var i=0;i<res.length;i++){
                    $("#crearProyectos").append(
                        `<div id="${res[i]._id}" class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Proyecto</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res[i].nombreProyecto}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-folder fa-2x text-gray-300"></i>
                                        </div>
                                        <div class="text-xs mt-1 mb-n3"><a href="" data-toggle="modal" data-target="#modalArchivoProyecto">Ver más</a> | <a href="" onclick="eliminar(event, '${res[i]._id}')">Eliminar</a>
                                            | <a href="/compilador" onclick="Editar(event, '${res[i]._id}')">Editar</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
                    $("#collapProyectos").append(`<a class="collapse-item">${res[i].nombreProyecto}</a>`);
                      
                }
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}

function obtenerArchivos(){
    $.ajax({
        url:"/inicio/archivos",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            $("#crearArchivos").html('');
            if(res.length==0){
                $("#crearArchivos").append('No hay archivos Crea uno nuevo');
            }else{
                for(var i=0;i<res.length;i++){
                    $("#crearArchivos").append(
                        `<div id="${res[i]._id}" class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Archivo</div>
                                            <div id="nomArchivo" class="h5 mb-0 font-weight-bold text-gray-800">${res[i].nombreArchivo}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-file fa-2x text-gray-300"></i>
                                        </div>
                                        <div class="text-xs mt-1 mb-n3"><a href="" onclick="eliminarArchivo(event, '${res[i]._id}')">Eliminar</a>
                                            | <a href="" onclick="EditarArchivo(event, '${res[i]._id}')" data-toggle="modal" data-target="#modalArchivoEditar">Editar</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
                    $("#collapArchivos").append(`<a class="collapse-item">${res[i].nombreArchivo}</a>`);
                }
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}

$("#crearProyectos").append(obtenerProyectos());
$("#crearArchivos").append(obtenerArchivos());


    function eliminar(e,id){
        e.preventDefault(); //Evitar comportamiento por defecto de un anchor
        console.log('Eliminar el objeto: ' + id);
        alert("El proyecto se eliminara!");
            $.ajax({
                url:"/proyecto/eliminar/"+id,
                method:"delete",
                dataType:"json",
                success:function(res){
                    console.log(res);
                    if (res.status==1){
                        $("#"+id).remove();
                    }
                },
                error:function(error){
                    console.log(error);
                }
            });
            
    }

    function eliminarArchivo(e,id){
        e.preventDefault(); //Evitar comportamiento por defecto de un anchor
        console.log('Eliminar el objeto: ' + id);
        alert("El archivo se eliminara!");
            $.ajax({
                url:"/archivo/eliminar/"+id,
                method:"delete",
                dataType:"json",
                success:function(res){
                    console.log(res);
                    if (res.status==1){
                        $("#"+id).remove();
                    }
                },
                error:function(error){
                    console.log(error);
                }
            });
            
    }

    function EditarArchivo(e,id){
        e.preventDefault(); //Evitar comportamiento por defecto de un anchor
        var parametro = `nombreArchivo=${$("#form10").val()}&tipoArchivo=${$("#form11").val()}`;
        $('#btneditararchivo').click(()=>{
            $.ajax({
                url:"/editar/archivo/"+id,
                method:"put",
                data: parametro,
                dataType:"json",
                success:function(res){
                    console.log(res);
                    console.log('Archivo editado');
                    if(res.ok==1){
                        $('#nomArchivo').html('');
                        $('#nomArchivo').append(`${$("#form10").val()}`);
                    }
                    
                },
                error:function(error){
                    console.log(error);
                }
            });
        });    
            
    }

    $('#btnlogout').click(()=>{
        $.ajax({
            url:"/logout",
            method:"get",
            success:function(res){
                console.log(res);
                console.log('salir');
                location.href='/login';
                
            },
            error:function(error){
                console.log(error);
            }
        });
    });