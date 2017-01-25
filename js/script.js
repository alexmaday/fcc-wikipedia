window.onload = function() {
   "use strict";
   var qstring = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&";
   var cors = "&origin=*";

   function clearResults() {
      if (document.body.contains(document.getElementById('results'))) {
         document.getElementById('results').remove();
      }

   }

   function writeArticles(articles) {
      clearResults(); // from previous search
      var results = document.createElement('div');
      results.setAttribute('id', 'results');

      // param articles is an array
      var i;
      var hit, heading, desc, anchor;
      for (i = 0; i < articles.length; i += 1) {
         hit = document.createElement('div');
         heading = document.createElement('h2');
         desc = document.createElement('p');
         anchor = document.createElement('a');

         heading.innerHTML = articles[i].title;
         hit.appendChild(heading);

         desc.innerHTML = articles[i].snippet;
         hit.appendChild(desc);

         anchor.href = "http://en.wikipedia.org/wiki/" + articles[i].title;
         anchor.target = "_blank";
         hit.appendChild(anchor);

         hit.classList.add('hit', 'col-xs-offset-2', 'col-xs-8', 'well');

         results.appendChild(hit);
         results.classList.add('row');
      }
      document.getElementsByClassName('container')[0].appendChild(results);
   }

   function getArticles() {
      var response = "";
      var searchTerm = "";
      searchTerm = document.getElementById('searchTerm').value;

      if (!searchTerm) {
         console.log('No keyword detected');
      } else {
         var http = new XMLHttpRequest();
         var s = "&srsearch=" + encodeURI(searchTerm);

         http.onreadystatechange = function() {
            console.log('Ready state: ' + http.readyState);
            if (http.readyState === 4 && http.status === 200) {
               response = JSON.parse(http.responseText);
               writeArticles(response.query.search);
               console.log(response);
            }
         };

         http.open('GET', qstring + s + cors);
         http.send(null);
      }

   }

   document.getElementById('btnSearch').addEventListener('click', getArticles);
   document.getElementById('searchTerm').addEventListener('keyup', function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
         document.getElementById('btnSearch').click();
      }
   });

};