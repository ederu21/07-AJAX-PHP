(() => {

	$("#frmData").on("submit", (e) => {
		e.preventDefault();

		let formulario = $("#frmData");
		let dataSerializada = formulario.serialize();
		//console.log(dataSerializada);

		$.ajax({
			type: 'POST',
			url: 'php/servicios/post.alumnos.php',
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
})();