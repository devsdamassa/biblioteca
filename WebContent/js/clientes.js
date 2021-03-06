$("#busca").hide();
$("#pesquisar_cliente").hide();
$("label.lb-busca").hide();

function requestServer(data) {
	return $.ajax({
		url: '/biblioteca/ClienteServlet',
		type: 'POST',
		data: data,
		dataType: 'json',
		timeout: 5000,
		async: false,
		error: function(response) {
			console.log(response, 'ERRO AJAX');			
		},
		success: function(resp) {
			return resp;
		}
	});
}

$("#filtro").on("change", function() {
	var $elm = $(this).val(); 
	switch ($elm) {
		case "CPF":
			$("label.lb-busca").text("Digite o CPF desejado: ").show();
			$("#busca").val("").show();
			$("#pesquisar_cliente").show();
			break;
		case "NOME":
			$("label.lb-busca").text("Digite o Nome do cliente: ").show();
			$("#busca").val("").show();
			$("#pesquisar_cliente").show();
			break;
		case "TIPO":
			$("label.lb-busca").text("Qual tipo de solicitante e o usuario que voce deseja pesquisar : ").show();
			$("#busca").val("").show();
			$("#pesquisar_cliente").show();
			break;
		case "TODOS":
			$("#busca").hide();
			$("label.lb-busca").hide();
			$("#pesquisar_cliente").show();
			break;
		default:
			$("#busca").hide();
			$("#pesquisar_cliente").hide();
			$("label.lb-busca").hide();
			break;
	}
});
$("#pesquisar_cliente").on('click',function() {
	var data = {acao: 'PESQUISA', filtro: $("#filtro").val(), busca: $('#busca').val()};
	var response = requestServer(data).responseJSON;
	
	montarListacliente(response);
});

$("#incluir_cliente").on('click',function() {
	var data = {
				acao: 'INCLUIR',
				cpf: $('#cpf').val(),
				nome: $('#nome').val(),
				tipo: $('#tipo').val()
			};
	console.log(data);
	var response = requestServer(data);
	$("#gridSystemModalLabel").val("Cadastrar cliente");
});

function montarListacliente(data) {
	var html = "";
	for (var i in data) {
		html += "<tr id=" + data[i].id + ">" +
				"	<td id='id_" + data[i].id + "'       data-val='" + data[i].id       +"'>"+ data[i].id   +"</td>" +
				"	<td id='cpf_" + data[i].id + "'       data-val='" + data[i].cpf       +"'>"+ data[i].cpf   +"</td>" +
		 		"	<td id='nome_" + data[i].id + "'     data-val='" + data[i].nome     +"'>"+ data[i].nome +"</td>" +
		 		"	<td id='tipo_" + data[i].id + "'     data-val='" + data[i].tipo     +"'>"+ data[i].tipo +"</td>" +
		 		"	<td><span class='glyphicon glyphicon-pencil'></span> <span class='glyphicon glyphicon-trash pull-right'></span></td>" +
				"</tr>";
	}
	
	$("table.table tbody").html(html).closest('.row').removeClass('hidden');
	
	$(".glyphicon-trash").click( function() {
		var $elem = $(this);
		var data = {
			acao: "REMOVER",
			id: $elem.closest('tr').attr('id')
		};
		var response = requestServer(data);	
		$elem.closest('tr').remove();
	});
	
	$(".glyphicon-pencil").on('click', function() {
		$elm = $(this);
		var id_atual = $elm.closest('tr').attr('id');
		$("#id_atual").val(id_atual);
		$("#cpf").val($("#cpf_"+id_atual).attr('data-val'));
		$("#nome").val($("#nome_"+id_atual).attr('data-val'));
		$("#tipo").val($("#tipo_"+id_atual).attr('data-val'));
		
		$("#modal").trigger('click');
		$("#incluir_cliente").hide();
		$("#alterar_cliente").show();
	});



}
$("#modal").click(function() {
	$('.abreModal').modal();
});

$("#cadastrar_cliente").on('click',function() {
	console.log('teste');
	$("#incluir_cliente").show();
	$("#alterar_cliente").hide();
	$("#nome").val("");
	$("#cpf").val("");
	$("#tipo").val("");	
	$("#modal").trigger('click');
});

$("#alterar_cliente").on('click',function() {
	$("#gridSystemModalLabel").html("Alterar cliente");
	var data = {
			acao: 'ALTERAR',
			id: $("#id_atual").val(),
			cpf: $("#cpf").val(),
			nome: $('#nome').val(),
			tipo: $('#tipo').val()
		};
	var response = requestServer(data);
	$("#cpf_"+data.id).text(data.cpf);
	$("#nome_"+data.id).text(data.nome);
	$("#tipo_"+data.id).text(data.tipo);
	$("#"+data.id).addClass("success");
});
