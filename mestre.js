// VERSÃO 1.0
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
	$('body').append(snippet);
}

function esconder_zopim(){
	$zopim.livechat.window.show();
}