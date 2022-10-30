(()=>{
    $(document).ready(() => {

        $.ajax({
            type: 'POST',
            url: 'php/servicios/get.alumnos.php',
            dataType: 'json'
        })
            .done(function (data) {

                console.log("Correcto!");

                console.log(data); // Se imprime en consola la api

                if (data.error) {
                    alert("Hubo un Error::::" + data.error);
                    return;
                }

                data.alumnos.forEach(alumno => {
                    let content = "";
                    content += '<tr id="fila'+alumno.id+'">';
                    content += '<td>'+alumno.id+'</td>';
                    content += '<td>'+alumno.nombre+'</td>';
                    content += '<td>'+alumno.estado+'</td>';
                    content += '<td class="text-center"><a href="actualizar.html?id='+alumno.id+'" class="btn btn-primary"><i class="fa fa-pencil-square-o"></i></a></td>';
                    content += '<td class="text-center"><a href="" data-nombre="'+alumno.nombre+'" data-id="'+alumno.id+'" class="btn btn-danger botEliminar"><i class="fa fa-trash-o"></i></a></td>';
                    content += '</tr>';

                    $('#tblRegistros').append(content);
                });
            })
            .fail(function () {
                console.log("Fallo!");
            })
            .always(function () {
                console.log("Completo!");
            });
    })

    //sintaxis para aplicar a elementos dinamicos creados por js
    $("body").on("click",".botEliminar",function(e){
        e.preventDefault();
        //Se obtiene el atributo de data-id
        let id=$(this).data('id');
        let nombre= $(this).data('nombre');
        swal({
            title: "Estas Seguro",
            text: "De querer borrar a: "+ nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                borrarRegistro(id);
                
            } else {
              swal("No se borro el registro");
            }
          });        
    })

    const borrarRegistro=(id)=>{        
        console.log(id);

        $.ajax({
            type: 'POST',
            url: 'php/servicios/post.borraralumno.php?id='+id,
            dataType: 'json'
        })
        .done(function (data) {

            console.log("Correcto!");

            console.log(data); // Se imprime en consola la api

            $('#fila'+id).remove();
            swal("El registro a sido borrado!", {
                icon: "success",
              }); 
        });
    }
})();