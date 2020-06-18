
//inicializar variavel mais tarde sera populada pela requisição
var encomendas = {};
var encomendaPesquisada = [];

//previnir enter
const handle = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
}

//função para limpar input no focus
const limpar = (x) => {
    x.value = "";
    x.style.color = "black";

    //rexibindo caso tenha dado erro no percorrimento do array

    //removendo msg erro
    var erros = document.getElementsByClassName('erro');
    if (erros.length > 0) {
        for (var i = 0; i < erros.length; i++) {
            erros[i].remove();
        }


        //restaurando pre-pesquisa
        document.getElementById("result1").innerHTML = "Pesquise";
        document.getElementById("result2").innerHTML = "Pesquise";
        document.getElementById("result3").innerHTML = "Pesquise";
        document.getElementById("result4").innerHTML = "Pesquise";

        //rexibindo box de pesquisas
        var all = document.getElementsByClassName('boxed');
        for (var i = 0; i < all.length; i++) {
            all[i].style.display = 'block';
        }
    }
}
const busca = ()=> {
    //pegando input
    var input = document.getElementById("search");

    // guardar em variavel e passar para maiuscula para bater com a baseva

    var valor = input.value.toUpperCase();

    //se não tiver vazio ou nulo
    if (valor != '' && valor != null) {
        //loader
        var loader = document.getElementById("spinner");

        loader.classList.add("loader");

        var x = new XMLHttpRequest();

        //requisição assyncrona
        x.open('GET', 'https://api.jsonbin.io/b/5eeb858919b60f7aa95cc5f2', true);

        //quando completar a requisição
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                encomendas = JSON.parse(x.responseText);
                callback(encomendas);
            }
        };
        x.send();


        var callback = (y) => {

            var achou = false;
            //percorrer encomendas com o valor do input e comparar
            y.encomendas.forEach(element => {
                if (valor == element.numero) {

                    encomendaPesquisada = element;

                    //sets nos elements

                    document.getElementById("result1").innerHTML = encomendaPesquisada.id + ' - ' + encomendaPesquisada.cliente.nome;

                    //passando valor para string para botar filtro para reais
                    encomendaPesquisada.valor = encomendaPesquisada.valor.toFixed(2).replace(".", ",");

                    document.getElementById("result2").innerHTML = "R$ " + encomendaPesquisada.valor;


                    var data = encomendaPesquisada.data;
                    data = data.substring(0, data.indexOf("T"))
                    data = data.split("-");
                    var dia = data[2];
                    var mes = data[1];
                    var ano = data[0];

                    document.getElementById("result3").innerHTML = dia + "/" + mes + "/" + ano;

                    if (encomendaPesquisada.entregue != false) {
                        document.getElementById("result4").innerHTML = "Entregue";
                    } else {
                        document.getElementById("result4").innerHTML = "Entregar";
                    }
                    achou = true
                }


            });

            loader.classList.remove("loader");

            //se nao nenhum nada
            if (achou == false) {
                var all = document.getElementsByClassName('boxed');
                for (var i = 0; i < all.length; i++) {
                    all[i].style.display = 'none';
                }

                //msgs de não encontrada
                var elemento1 = document.createElement("h4");
                var textoElemento1 = document.createTextNode("Encomenda");
                elemento1.classList.add("erro");
                elemento1.style.color = "red";
                elemento1.style.textAlign = "center";
                elemento1.style.fontStyle = "normal";
                elemento1.style.margin = "0 auto";
                elemento1.appendChild(textoElemento1);

                var elemento2 = document.createElement("h4");
                var textoElemento2 = document.createTextNode("não encontrada!");
                elemento2.classList.add("erro");
                elemento2.style.color = "red";
                elemento2.style.textAlign = "center";
                elemento2.style.fontStyle = "normal";
                elemento2.style.margin = "0 auto";
                elemento2.appendChild(textoElemento2);

                var elemento3 = document.createElement("h4");
                var textoElemento3 = document.createTextNode("Procure novamente");
                elemento3.classList.add("erro");
                elemento3.style.color = "red";
                elemento3.style.textAlign = "center";
                elemento3.style.fontStyle = "normal";
                elemento3.style.margin = "30 auto";
                elemento3.appendChild(textoElemento3);

                document.getElementById("result").appendChild(elemento1).appendChild(elemento2).appendChild(elemento3);
            }
        }
    }
    else {
        //se vier nulo ou string vazia
        input.value = "Digite algo na pesquisa";
        input.style.color = "red";
    }
}