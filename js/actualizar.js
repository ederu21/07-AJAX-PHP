(() => {
     const $_GET=(param)=> {
        var vars = {};
        window.location.href.replace(location.hash, '').replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function (m, key, value) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if (param) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }

    $(document).ready(() => {
        let id= $_GET('id');
        $.ajax({
            type: 'POST',
            url: 'php/servicios/get.alumnos.php?id='+id,
            dataType: 'json'
        })
            .done(function (data) {

                console.log("Correcto!");

                console.log(data); // Se imprime en consola la api

                let alumno = data.alumnos[0];
                $('#txtId').val(alumno.id);
                $('#txtNombre').val(alumno.nombre);
                $('#cmbEstado').val(alumno.estado);
            });


    //Actualizar Registro

    $("#frmData").on("submit", (e) => {
		e.preventDefault();

		let formulario = $("#frmData");
		let dataSerializada = formulario.serialize();
		//console.log(dataSerializada);

		$.ajax({
			type: 'POST',
			url: 'php/servicios/post.guardaralumno.php',
			dataType: 'json',
			data: dataSerializada
		})
			.done(function (data) {

				console.log("Correcto!");

				console.log(data); // Se imprime en consola la api


			})
			.fail(function () {
				console.log("Fallo!");
			})
			.always(function () {
				console.log("Completo!");
			});
	})
    });
})();