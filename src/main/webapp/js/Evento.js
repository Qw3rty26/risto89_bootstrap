    class eventoCard{

       //All the attributes of the event
       #title;
       #subtitle;
       #description;
       #event_type;
       #place;
       #date;
       #hour;
       #image;
       #ticket_type;
       #price;
       #discount;
       #numberOfClicks;


       //Constructor for the class, we set everything to have a default value of the type "default<Name>"
       constructor(title = "defaultTitle", subtitle = "defaultSubTitle", description = "defaultDescription", 
       eventType = "defaultEventType", place = "defaultPlace", date = "defaultDate", hour = "defaultHour",
       image = "...", ticket_type = "defaultTicketType", price = "defaultPrice", 
       discount = "defaultDiscount", numberOfClicks = "defaultNumberOfClicks") {
	 this.title = title;
         this.subtitle = subtitle;
         this.description = description;
         this.eventType = eventType;
         this.place = place;
         this.date = date;
         this.hour = hour;
         this.image = image;
         this.ticket_type = ticket_type;
	 this.price = price;
	 this.discount = discount;
	 this.numberOfClicks = numberOfClicks;
       }

       _getDetailsCardHeader(){
                var card_header = document.createElement("div");
                card_header.classList.add("card-header", "text-white", "h3", "text-center");


                switch (this.eventType){

                 case "Concerti":
                     this.eventType = "Concerto";
                     card_header.style.backgroundColor = "red";
                 break;

                 case "EventiSportivi":
                     this.eventType = "Evento Sportivo";
                     card_header.style.backgroundColor = "orange";
                 break;

                 case "SpettacoliTeatrali":
                     this.eventType = "Spettacolo Teatrale";
                     card_header.style.backgroundColor = "green";
                 break;

                 case "VisiteGuidate":
                     this.eventType = "Visita Guidata";
                     card_header.style.backgroundColor = "purple";
                 break;

                 default:
                     card_header.style.backgroundColor = "blue";
                 break;
                }

                card_header.textContent = this.title;
		return card_header;
       }

       _getDetailsCardBody(){
                var card_body = document.createElement("div");
                card_body.classList.add("card-body", "text-center");

                var first_row = document.createElement("div");
                first_row.classList.add("row", "container-fluid", "mx-auto", "px-0");

                var picture_container = document.createElement("div");
                picture_container.classList.add("col-lg-7", "text-center", "bg-dark", "rounded");

                var picture = document.createElement("img");
                picture.style.maxWidth = "100%";
                picture.style.maxHeight = "240px";
                picture.src = "http://localhost:41063/risto89-1.0/immagini/" + this.image;


                picture_container.appendChild(picture);

                var subtitle_description_container = document.createElement("div");
                subtitle_description_container.classList.add("col-lg-5", "text-center");


                var description_row = document.createElement("div");
                description_row.classList.add("row");

                var description_shower = document.createElement("cite");
                description_shower.textContent = this.description;

                description_row.appendChild(description_shower);

                var subtitle_row = document.createElement("div");
                subtitle_row.classList.add("row");

                var subtitle_shower = document.createElement("p");
                subtitle_shower.textContent = this.subtitle;
                subtitle_shower.classList.add("h2");

                subtitle_row.appendChild(subtitle_shower);


                subtitle_description_container.appendChild(subtitle_row);
                subtitle_description_container.appendChild(description_row);


                first_row.appendChild(picture_container);
                first_row.appendChild(subtitle_description_container);


                var second_row = document.createElement("div");
                second_row.classList.add("row", "container-fluid", "mx-auto");


                var second_row_container = document.createElement("div");
                second_row_container.classList.add("card", "border-0", "pt-3");

                var second_row_container_body = document.createElement("div");
                second_row_container_body.classList.add("card-body", "bg-secondary", "rounded");

                var second_row_container_body_row = document.createElement("div");
                second_row_container_body_row.classList.add("row");

                var second_row_first_col = document.createElement("div");
                second_row_first_col.classList.add("col-md-6");

                function makeRow(title = "defaultTitle", image = "defaultImage", content = "defaultContent"){


                var row = document.createElement("div");
                row.classList.add("row", "d-flex", "justify-content-center");

                var row_container = document.createElement("div");
                row_container.classList.add("text-white", "row");

                var image_title = document.createElement("div");
                image_title.classList.add("col-md-6", "d-flex", "align-items-center", "justify-content-center");

                var image_container = document.createElement("img");
                image_container.style.width = "47px";
                image_container.style.height = "47px";
                image_container.src = image;

                var title_container = document.createElement("h4");
                title_container.classList.add("text-truncate", "d-flex", "align-items-center", "px-3", "d-lg-block", "d-none");
                title_container.textContent = title;

                image_title.appendChild(image_container);
                image_title.appendChild(title_container);
                row_container.appendChild(image_title);

                var content_container = document.createElement("div");
                content_container.classList.add("col-md-6", "d-flex", "align-items-center", "justify-content-center");

                var content_shower = document.createElement("h5");
                content_shower.classList.add("text-truncate");
                content_shower.textContent = content;

                content_container.appendChild(content_shower);

                row_container.appendChild(content_container);

                row.appendChild(row_container);

                return row;
                }

                function getSeparator(){
                    var hr = document.createElement("hr");
                    hr.classList.add("hr", "hr-blurry");

                    return hr;

                }

                second_row_first_col.appendChild(makeRow("Data:", "utils/calendar-icon.png", this.date));
                second_row_first_col.appendChild(getSeparator());
                second_row_first_col.appendChild(makeRow("Ora:", "utils/clock-icon.png", this.hour));
                second_row_first_col.appendChild(getSeparator());
                second_row_first_col.appendChild(makeRow("Luogo:", "utils/location-icon.png", this.place));
                second_row_first_col.appendChild(getSeparator());
                second_row_first_col.appendChild(makeRow("Clicks:", "utils/click-icon.png", this.numberOfClicks));


                var second_row_second_col = document.createElement("div");
                second_row_second_col.classList.add("col-md-6");

                var special_hr = document.createElement("hr");
                special_hr.classList.add("hr", "hr-blurry", "d-md-none", "d-block");

                second_row_first_col.appendChild(special_hr);

                second_row_second_col.appendChild(makeRow("Evento:", "utils/event-icon.png", this.eventType));
                second_row_second_col.appendChild(getSeparator());
                second_row_second_col.appendChild(makeRow("Biglietto:", "utils/ticket-icon.png", this.ticket_type));
                second_row_second_col.appendChild(getSeparator());

                second_row_second_col.appendChild(makeRow("Prezzo:", "utils/price-icon.png", this.price + " euro"));
                second_row_second_col.appendChild(getSeparator());
		if(this.discount != "0"){
                    second_row_second_col.appendChild(makeRow("Sconto:", "utils/discount-icon.png", "-" + this.discount + "%"));

                }else{
                    second_row_second_col.appendChild(makeRow("Sconto:", "utils/discount-icon.png", "No"));
                }

                second_row_container_body_row.appendChild(second_row_first_col);
                second_row_container_body_row.appendChild(second_row_second_col);
                second_row_container_body.appendChild(second_row_container_body_row);
                second_row_container.appendChild(second_row_container_body);

                second_row.appendChild(second_row_container);

                card_body.appendChild(first_row);
                card_body.appendChild(second_row);

		return card_body;
       }

       _getDetailsCardFooter(){
                var card_footer = document.createElement("div");
                card_footer.classList.add("card-footer", "d-flex", "justify-content-between");

                //Blue button
                var closeButton = document.createElement("button");
                closeButton.textContent = "Chiudi";
                closeButton.classList.add("btn", "btn-primary");
                closeButton.onclick = () => {
                    window.history.back();
                };
                //Blue button

                //Green button
                var acquistaForm = document.createElement("form");
                acquistaForm.action = "/risto89-1.0/acquistaevento";
                acquistaForm.method = "POST";

                var hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "titolo";
                hiddenInput.class = "text";
                hiddenInput.value = this.title;
                acquistaForm.appendChild(hiddenInput);

                var acquistaButton = document.createElement("button");
                acquistaButton.textContent = "Compra";
                acquistaButton.classList.add("btn", "btn-success");
                acquistaButton.type = "submit";
                acquistaForm.appendChild(acquistaButton);
                //Green button

                card_footer.appendChild(closeButton);
                card_footer.appendChild(acquistaForm);
		return card_footer;
       }

       _getDetailsCard(){


		var card = document.createElement("div");
		card.classList.add("card", "mt-4");

		card.appendChild(this._getDetailsCardHeader());
		card.appendChild(this._getDetailsCardBody());
		card.appendChild(this._getDetailsCardFooter());
		
		return card;
       }

    }


    //Function that shows the cards of the events
    function mostraEvento(elemento) {

       //div inside the "Eventi.jsp"
       var cardList = document.getElementById("eventoCard");
       

       //Create a new object of type "event" and use its methods
       var event = new eventoCard(elemento.titolo, elemento.sottotitolo, elemento.descrizione, elemento.tipologia, elemento.luogo, elemento.data, elemento.ora, elemento.image, elemento.tipologiaBiglietti, elemento.prezzo, elemento.sconto, elemento.numeroClick);

        cardList.appendChild(event._getDetailsCard());
    }


    //Called every time the "/evento" page is opened
    function mostraLista(){

       //The page has to show a single event, identified by the title
       //We use this variable to write a GET request and get only that event
       //titolo = "${titolo}"   <--- This line is inside "Eventi.jsp"

       //Creating the url needed to call the api
       var url = '/risto89-1.0/ottieniEvento';
       if (titolo != "") {
           //Add the specific type of event request (GET)
           url += '?titolo=' + titolo;
       }

	  //Let's call the api!
           fetch(url)
                .then(function(response) {
                    if (!response.ok) {
		       //Something went wrong! Inform the user...
                        throw new Error('Network response was not ok');
                    }
		   // Parse JSON data from response
                    return response.json();
                })
                .then(function(data) {
                    //Lets show the obtained JSON to the browser!
		   mostraEvento(data);
                })
                .catch(function(error) {
		   //Something went wrong! Inform the user...
                    console.error('Error fetching data:', error);
                    content.innerHTML = 'Error fetching data.';
                });

    }
