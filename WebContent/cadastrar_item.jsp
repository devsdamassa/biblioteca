<%@include file="cabecalho.jsp"%>
<form action="cadastrarItem" method="POST">
	<div class="container">
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<h1>Cadastrar itens</h1>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label for="nome">Nome:</label> <input id="id" class="form-control" type="text" name="nome"/>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label for="status">Status:</label> <select class="form-control" name="status">
								<option selected>Selecione um Status</option>
								<option value="a">Ativo</option>
								<option value="i">Indispon�vel</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label for="tipo">Tipo:</label> <label> 
							<input type="radio" id="revista" name="tipo" value="r">Revista</label> 
							<label> <input type="radio" id="livro" name="tipo" value="l">Livro </label>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-12">
						<input class="btn btn-primary btn-block" type="submit"
							value="Cadastrar" />
					</div>
				</div>

			</div>
		</div>

	</div>
</form>
<%@include file="footer.jsp"%>