<%-- Make special characters (ù è à) and java coding available --%>
<%@page language="java" contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>risto89 - gestione eventi</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">


    <script>
    /**
     * Function that makes a POST request to the server to delete an event
     * @param {string} titolo - The title of the event to delete
     */
    function callDeleteEvent(titolo) {
        const url = '/risto89-1.0/eliminaEvento';
        
        // Data to be sent in the POST request
        var data = new URLSearchParams();
        data.append('titolo', titolo);

        // Options for the fetch request
        const options = {
            method: 'POST',
            body: data 
        };

        // Make the POST request
        fetch(url, options).then(response => {
            if (response.ok) {
                console.log('Success!', response);
                location.reload();
            } else {
                console.error('Request failed:', response.statusText);
            }
        });
    }

    /**
     * Function that shows the list of events
     */
    function mostraLista() {
       var datiJson = JSON.parse( '${eventiJson}' ); 

       var check = document.getElementById("isOrdered");
       if (check.checked) {
           datiJson.sort(function(a, b) {
               return a.numeroClick < b.numeroClick;
           });
       }

       var lista = document.getElementById("listaEventi");

       // Clearing the table
       while (lista.firstChild) {
         lista.removeChild(lista.firstChild);
       }

       datiJson.forEach(function(elemento) {
            var tr = document.createElement("tr");

            var button = document.createElement("button");
            button.textContent = "Elimina";
            button.classList += "btn btn-danger";
            button.onclick = function() { callDeleteEvent(elemento.titolo); };
            tr.appendChild(button);

            var titolo = document.createElement("td");
            titolo.textContent = elemento.titolo;
            tr.appendChild(titolo); 
 
            var sottotitolo = document.createElement("td");
            sottotitolo.textContent = elemento.sottotitolo;
            tr.appendChild(sottotitolo); 
 
            var descrizione = document.createElement("td");
            descrizione.textContent = elemento.descrizione;
            tr.appendChild(descrizione); 
 
            var tipologia = document.createElement("td");
            tipologia.textContent = elemento.tipologia;
            tr.appendChild(tipologia); 
 
            var luogo = document.createElement("td");
            luogo.textContent = elemento.luogo;
            tr.appendChild(luogo); 
 
            var data = document.createElement("td");
            data.textContent = elemento.data;
            tr.appendChild(data); 
 
            var ora = document.createElement("td");
            ora.textContent = elemento.ora;
            tr.appendChild(ora); 

            var tipologiaBiglietti = document.createElement("td");
            tipologiaBiglietti.textContent = elemento.tipologiaBiglietti;
            tr.appendChild(tipologiaBiglietti); 
 
            var prezzo = document.createElement("td");
            prezzo.textContent = elemento.prezzo;
            tr.appendChild(prezzo); 
 
            var sconto = document.createElement("td");
            sconto.textContent = elemento.sconto;
            tr.appendChild(sconto); 
 
            var numeroClick = document.createElement("td");
            numeroClick.textContent = elemento.numeroClick;
            tr.appendChild(numeroClick); 
 
            lista.appendChild(tr);
        });
    }
    </script>   


    </head>
    <body onload="mostraLista()">

	<!--NAVIGATION BAR-->
        <%@include file="../Header.jsp"%>
	<!--NAVIGATION BAR-->


        <!--PAGE CONTENT-->

    <div class="table-responsive" style="padding-top: 2%; padding-left: 2%; padding-right: 2%">

        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Titolo</th>
            <th>Sottotiolo</th>
            <th>Descrizione</th>
            <th>Tipologia</th>
            <th>Luogo</th>
            <th>Data</th>
            <th>Ora</th>
            <th>Tipologia Biglietti</th>
            <th>Prezzo</th>
            <th>Sconto</th>
            <th>Numero di Click</th>
          </tr>
          </thead>
          <tbody id="listaEventi"></tbody>

        </table>

        <label class="form-check-label" for="isOrdered">Ordina per numero di click</label>
        <input type="checkbox" id="isOrdered" onclick="mostraLista()" autocomplete="off">

	</div>



	<!--PAGE CONTENT-->


        <!--FOOTER-->
        <%@include file="../Footer.jsp"%>
        <!--FOOTER-->

    </body>
</html>
