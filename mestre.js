// VERSÃO 2.1
console.log("VERSÃO JS 2.1");
function desabilitar(){
	alert ("Todos os direitos Reservados. A cópia e reprodução não-autorizada está expressamente proibida.")
	return false
}
//FUNÇÃO PARA PEGAR PARAMETROS NA URL
function _GETURL(variavel)
{
	var url   = window.location.search.replace("?", "");
	var itens = url.split("&");
	for(n in itens)
	{
		if( itens[n].match(variavel) )
		{
			return decodeURIComponent(itens[n].replace(variavel+"=", ""));
		}
	}
	return null;
}

function cria_cookie(name, element){
	console.log("Cookie "+name+" criado");
	document.cookie = name+" = "+element+";path=/";
}


//FUNÇÃO PARA PEGAR OS VALORES DOS COOKIES
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}

	return null;
}


//FUNÇÃO PARA CRIAR UM INPUT HIDDEN NO FORMULÁRIO
function _CRIAINPUT(nome, propriedade){
	if (propriedade == null) {
		return false;
		console.log('A');
	}else{

		var propriedade = propriedade.toUpperCase();

		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", nome);
		input.setAttribute("value", propriedade);
		$( "form" ).append( input );
	}
}


function formatNumber(num) {
	var a = num.toString().substring(0, 4);
	var b = num.toString().substring(4, 7);
	var c = num.toString().substring(7, 11);

	return a+" "+b+" "+c;
}

//FUNÇÃO PARA MUDAR OS TELEFONES DE ACORDO COM A CAMPANHA
var muda_tel = function(tel_atual, tel_novo){
	var tel_novo_clean = tel_novo.replace(/[^0-9]/g, '');
	var tel_atual_clean = tel_atual.replace(/[^0-9]/g, '');

	// Formatado = XXXX XXX XXXX
	var tel_atual_formatado = formatNumber(tel_atual_clean);
	var tel_novo_formatado = formatNumber(tel_novo_clean);

	console.log(tel_novo_clean);
	console.log(tel_atual_clean);

	$( "a:contains('"+tel_atual_formatado+"')" ).each(function() {
		var current_html = $(this).html();
		
		$(this).html(current_html.replace(tel_atual_formatado, tel_novo_formatado));

		$(this).attr('href', 'tel:'+tel_novo_clean);
	});

	$('a[href*="'+tel_atual_clean+'"]').each(function() {
		$(this).attr('href', 'tel:'+tel_novo_clean);
	});

};


function acao_pelo_tel(tel_atual){
	if ( readCookie('telefone') ){ //se o cokie existir

		if( _GETURL("telefone") ){ //se o telefone existe na url


		    if ( readCookie('telefone') == _GETURL("telefone") ){ // verifica se o cookie é igual ao telefone da URL
		        //Se o cookie existir, a URL também existir e eles forem iguais, muda os telefones.
		        muda_tel( tel_atual, _GETURL("telefone")  );
		        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
		        _CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
		        _CRIAINPUT( "utm_campaign", _GETURL("utm_campaign") );
		        console.log("A");

		    }else{
		        //Se o cookie existir, a URL também existir e eles NÃO forem iguais, muda os telefones e atualiza o COOKIE para o mesmo valor da URL.
		        muda_tel( tel_atual, _GETURL("telefone")  );
		        cria_cookie("telefone", _GETURL("telefone"));
		        cria_cookie("utm_campaign", _GETURL("utm_campaign"));
		        cria_cookie("utm_source", _GETURL("utm_source"));
		        cria_cookie("utm_medium", _GETURL("utm_medium"));
		        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
		        _CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
		        _CRIAINPUT( "utm_campaign", _GETURL("utm_campaign") );
		        console.log("B");

		    }

		}else{

		    //Se o cookie existir, mas a url não existir, muda o telefone pelo valor do cookie
		    muda_tel( tel_atual, readCookie("telefone")  );
		    _CRIAINPUT( "utm_source", readCookie("utm_source") );
		    _CRIAINPUT( "utm_medium", readCookie("utm_medium") );
		    _CRIAINPUT( "utm_campaign", readCookie("utm_campaign") );
		    console.log("C");

		}



	}else{

		if( _GETURL("telefone") ){

			//Se o cookie não existir, mas a URL existir, muda os telefones e Cria o cookie
			muda_tel( tel_atual, _GETURL("telefone")  );

			cria_cookie("telefone", _GETURL("telefone"));
			cria_cookie("utm_campaign", _GETURL("utm_campaign"));
			cria_cookie("utm_source", _GETURL("utm_source"));
			cria_cookie("utm_medium", _GETURL("utm_medium"));


			_CRIAINPUT( "utm_source", _GETURL("utm_source") );
			_CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
			_CRIAINPUT( "utm_campaign", _GETURL("utm_campaign") );
			console.log("D");


		}else{

			//se o cookie e a url não existirem, não muda telefone, mas cria os inputs utm_source e medium com valores padrões

			_CRIAINPUT( "utm_source", 'null' );
			_CRIAINPUT( "utm_medium", 'null' );
			_CRIAINPUT( "utm_campaign", 'null' );
			console.log("E");


		}

	}
}


function acao_pela_campanha(tel_atual, campanha_organica){
	if ( readCookie('utm_campaign') ){

		if( _GETURL("utm_campaign") ){

			muda_tel( tel_atual, checa_campanha( _GETURL("utm_campaign") ) );
		        
	        _CRIAINPUT( "site", _GETURL("utm_campaign") );
	        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
	        _CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
	        _CRIAINPUT( "utm_campaign", _GETURL("utm_campaign")  );

	        cria_cookie("site", _GETURL("utm_campaign") );
	        cria_cookie("utm_campaign", _GETURL("utm_campaign"));
	        cria_cookie("utm_source", _GETURL("utm_source"));
	        cria_cookie("utm_medium", _GETURL("utm_medium"));

		}else{

		    //Se o cookie existir, mas a url não existir, muda o telefone pelo valor do cookie
		    muda_tel( tel_atual, checa_campanha( readCookie("utm_campaign") ) );
		        
	        _CRIAINPUT( "site", readCookie("utm_campaign") );
	        _CRIAINPUT( "utm_source", readCookie("utm_source") );
	        _CRIAINPUT( "utm_medium", readCookie("utm_medium") );
	        _CRIAINPUT( "utm_campaign", readCookie("utm_campaign")  );
		}

	}else{

		if( _GETURL("utm_campaign") ){

			//Se o cookie não existir, mas a URL existir, muda os telefones e Cria o cookie
			muda_tel( tel_atual, checa_campanha( _GETURL("utm_campaign") ) );
		        
	        _CRIAINPUT( "site", _GETURL("utm_campaign") );
	        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
	        _CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
	        _CRIAINPUT( "utm_campaign", _GETURL("utm_campaign")  );

	        cria_cookie("site", _GETURL("utm_campaign") );
	        cria_cookie("utm_campaign", _GETURL("utm_campaign"));
	        cria_cookie("utm_source", _GETURL("utm_source"));
	        cria_cookie("utm_medium", _GETURL("utm_medium"));



		}else{

			//se o cookie e a url não existirem, não muda telefone, mas cria os inputs utm_source e medium com valores padrões
			_CRIAINPUT( "site", campanha_organica);
	        _CRIAINPUT( "utm_source", 'google' );
	        _CRIAINPUT( "utm_medium", 'organic' );
	        _CRIAINPUT( "utm_campaign", campanha_organica  );

	        cria_cookie("site", campanha_organica);
	        cria_cookie("utm_campaign", campanha_organica);
	        cria_cookie("utm_source", 'google');
	        cria_cookie("utm_medium", 'organic');

		}

	}
}


function mascara_telefone(classe_campo){
	var campo = ".p_inputtelefone";
	if (classe_campo == null) {
		classe_campo = campo; 
	}else{
		classe_campo = "."+classe_campo
	}

	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	spOptions = {
		onKeyPress: function(val, e, field, options) {
			field.mask(SPMaskBehavior.apply({}, arguments), options);
		}
	};

	$(classe_campo).mask(SPMaskBehavior, spOptions);
}


function carregar_script(snippet) {
	$('head').append(snippet);
}

function esconder_zopim(){
	$zopim.livechat.window.show();
}


var valida_form = function(form, event){
	event.preventDefault();

	console.log(form.attr('name'));

	var formulario = form;
	var campo_telefone = formulario.find('.p_inputtelefone');
	var tel_length_min = 8;
	var tel_length_max = 9;

	var campo_ddd = formulario.find('.p_inputddd');

	var input_colors = form.find('input').first().css('background-color');

	console.log("campo_ddd: "+campo_ddd.val());
	console.log("campo_telefone: "+campo_telefone.val());


	var ddd = false;
	var tel = false;

	if( typeof campo_ddd.val() !== 'undefined' ){
		if(campo_ddd.val().replace(/[^0-9]/g, '').length < 2 || campo_ddd.val().replace(/[^0-9]/g, '').length > 3 ){
			campo_ddd.css('background','#FF7171');
			campo_ddd.focus();
			console.log('q');

			ddd = false;
		}else{
			campo_ddd.css('background-color', input_colors);
			console.log('w');
			ddd = true;
		}
	}else{
		ddd = true;
		tel_length_min = 10;
		tel_length_max = 11;
	}

	if( typeof campo_telefone.val() !== 'undefined'  ){
		if(campo_telefone.val().replace(/[^0-9]/g, '').length < tel_length_min || campo_telefone.val().replace(/[^0-9]/g, '').length > tel_length_max ){
			campo_telefone.css('background','#FF7171');
			console.log('e');
			campo_telefone.focus();

			tel = false;
		}else{
			campo_telefone.css('background-color', input_colors);
			console.log('r');
			tel = true;
		}
	}else{
		tel = true;
	}


	if (ddd == true && tel == true) {
		return true;
	}else{
		return false;
	}
}