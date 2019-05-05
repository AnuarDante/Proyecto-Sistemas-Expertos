$("#btn-login").click(function(e){
    e.preventDefault();
	var parametro = `correo=${$("#modalLRInput10").val()}&password=${$("#modalLRInput11").val()}`;
	console.log(parametro);
    $.ajax({
        url:"/singin",
        method:"POST",
        data:parametro,
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.status == 1)
                window.location.href = "/inicio";
            else{
                document.getElementById('errorlogin').innerHTML='';
                $("#errorlogin").append(
                    `<div class="alert alert-danger" role="alert">
                    ${res.mensaje}
                    </div>`);
            }
        },
        error:function(error){
            console.error(error);
        }
    });
});

$("#guardarUsuario").click(function(e){
	e.preventDefault();
	var parametros = `usuario=${$("#modalLRInput14").val()}&password=${$("#modalLRInput13").val()}&correo=${$("#modalLRInput12").val()}`;
	console.log(parametros);
    $.ajax({
        url:"/singup",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log("Se hagrego un nuevo Usuario que es ");
            if(res.status==1){
                document.getElementById("usuarioexitoso").innerHTML='';
			console.log(res);
                $("#usuarioexitoso").append(`<div class="alert alert-primary" role="alert">
                ${res.mensaje}
                </div>`);
            }
            if(res.status==0){
                document.getElementById("usuarioexitoso").innerHTML='';
                console.log(res);
                $("#usuarioexitoso").append(`<div class="alert alert-danger" role="alert">
                ${res.mensaje}
                </div>`);
            }
        },
        error:function(error){
			console.error(error);
			$("#modalLRForm").modal("hide");
        }
    });
});