# FUNÇÕES JAVASCRIPT DOS PROJETOS DA PROTEÍNA

Este arquivo contém funções necessárias para uso em plataformas como Webflow, Unbounce e etc

## Getting Started

Adicione os arquivos mask e mestre.min.js no bottom, após o jquery:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script type="text/javascript" src="https://rawcdn.githack.com/proteina-digital/proteina-js/f0805c0d9bbfc8b1917408499d4cd5653b58bf16/mestre.min.js"></script>
```

### Prerequisites

What things you need to install the software and how to install them

```
Jquery
```

### Rodando

Funções disponíveis

MASCARA DE TELEFONE: PADRÃO: p_inputtelefone
```
mascara_telefone(null);
```

// CARREGA O ZOPIM/HUGGY/ANY APÓS 1,5 SEGUNDOS
```
setTimeout(carregar_script("<script bla bla bla><\/script>"), 1500);
```

TROCA O NÚMERO DE ACORDO COM O PARAMETRÔ (telefone=08001112222) DA URL
```
acao_pelo_tel(_NUMERO_0800_ORGANICO_AQUI_);
```

OTIMIZAR FONTES

No head (colocar no custom code para não ser carregado enquanto editando no designer)
```
<style>
  .not_ready * {
  	font-family: Arial, 'sans-serif' !important;
  }
</style>
```

No Webflow.push
```
carrega_fontes();
```
