function traerInformacionEspecialidades() {
    $.ajax({
        url: "http://129.151.98.207:8080/api/Specialty/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    /*let myTable="<table class='ui celled table'>
    
    "; */
    //let myTable = "<table class='ui celled table'>" + "<tr><th>NAME<th>DESCRIPTION</tr>"+;//
    let myTable = "<table class='ui center aligned celled table'>" + "<thead><tr><th>NAME</th><th colspan='3'>DESCRIPTION</th></tr></thead>"

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button class='ui yellow button' onclick=' actualizarInformacionEspecialidades(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button class='ui red button' onclick='borrarEspecialidad(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionEspecialidades() {
    let var2 = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: "http://129.151.98.207:8080/api/Specialty/save",


        success: function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });

}

function actualizarInformacionEspecialidades(idElemento) {
    let myData = {
        id: idElemento,
        name: $("#Cname").val(),
        description: $("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.98.207:8080/api/Specialty/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionEspecialidades();
            alert("se ha Actualizado correctamente la especialidad")
        }
    });

}



function borrarEspecialidad(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.98.207:8080/api/Specialty/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionEspecialidades();
            alert("Se ha Eliminado.")
        }
    });

}

