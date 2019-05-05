$(document).ready(function(){
    $.ajax({
        url:"/inicio/perfil",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            $("#crearPerfil").html('');
                    $("#crearPerfil").append(
                        `<div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center mb-n5">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Nombre</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res.usuario}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-user fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-danger shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center mb-n4">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Correo</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res.correo}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-envelope fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center mb-n5">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Creacion</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">${res.fecha}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2 view overlay">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center mb-n5">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Imagen</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                                        </div>
                                        <div class="col-auto">
                                            <img class="img-profile rounded-circle" style="width:25%" src="../img/user.jpg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );
            $('#nombre-user').html('');                   
            $('#nombre-user').append(`${res.usuario}`);        
        },
        error:function(error){
            console.log(error);
        }
    });
});

$('#editarUsuario').click(function(){
    var parametros = `usuario=${$("#form4").val()}&password=${$("#form7").val()}&correo=${$("#form5").val()}&passwordActual=${$("#form6").val()}`;
    $.ajax({
        url:'/perfil/actualizar',
        method:'PUT',
        data: parametros,
        dataType:'json',
        success:function(res){
            if(status==0){
                $('#errorPerfil').html('');
                $('#errorPerfil').append(`<div class="alert alert-danger" role="alert">
                ${res.mensaje}
                </div>`);
            }
            if(status==1){
                $('#errorPerfil').html('');
                $('#errorPerfil').append(`<div class="alert alert-primary" role="alert">
                ${res.mensaje}
                </div>`);
            }
        }
    });
});
