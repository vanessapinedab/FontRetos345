function autoTraeEspecilidades(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.98.207:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionDoctores() {
    $.ajax({
        url:"http://129.151.98.207:8080/api/Doctor/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaDoctores(response);
        }

    });

}

function pintarRespuestaDoctores(response){
    console.log(response)
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE SALON</th><th>PROPIETARIO</th><th>CAPACIDAD</th><th>DESCRIPCION</th><th>CATEGORIA.NAME</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].owner + "</td>";
        myTable+="<td>" + response[i].capacity + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
       // myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Doctor</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosDoctores(' + response[i].id + ')">Editar Doctor</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Doctor</button></td>'
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaPartyroom").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosDoctores(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.98.207:8080/api/Doctor/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#namesalones").val(item.name);
            $("#owner").val(item.owner);
            $("#capacity").val(item.capacity);
            $("#descriptionsalones").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarDoctores() {

    if($("#namesalones").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#descriptionsalones").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#namesalones").val(),
                owner: $("#owner").val(),
                capacity: $("#capacity").val(),
                description: $("#descriptionsalones").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.98.207:8080/api/Doctor/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#miListaPartyroom").empty();
                    $("#namesalones").val("");
                    $("#owner").val("");
                    $("#capacity").val("");
                    $("#descriptionsalones").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.98.207:8080/api/Doctor/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaPartyroom").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#namesalones").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#descriptionsalones").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#namesalones").val(),
            owner: $("#owner").val(),
            capacity: $("#capacity").val(),
            description: $("#descriptionsalones").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.98.207:8080/api/Doctor//update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaPartyroom").empty();
                listarPartyroom();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#miListaPartyroom").empty();
                $("#id").val("");
                $("#namesalones").val("");
                $("#owner").val("");
                $("#capacity").val("");
                $("#descriptionsalones").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
