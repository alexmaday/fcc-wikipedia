window.onload = function() {
   
   var qstring = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&"
   var cors = "&origin=*";

   document.getElementById('btnSearch').addEventListener('click', getArticles);
   document.getElementById('searchTerm').addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById('btnSearch').click();
        }
   });
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
            if (http.readyState === 4 && http.status == 200) {
               response = JSON.parse(http.responseText);
               writeArticles(response.query.search);
               console.log(response);
            }
         };

         http.open('GET', qstring + s + cors);
         http.send(null);
      }

   }

   function writeArticles(articles) {
      clearResults(); // from previous search
      var results = document.createElement('div'); results.setAttribute('id', 'results');
    //   var keys = Object.keys(response);

    // param articles is an array
    for (var i = 0; i < articles.length; i++) {
         
         var hit = document.createElement('div');
         var heading = document.createElement('h2')
         var desc = document.createElement('p');
         var anchor = document.createElement('a');
         
         heading.innerHTML = articles[i].title;
         hit.appendChild(heading);

         desc.innerHTML = articles[i].snippet;
         hit.appendChild(desc);

         anchor.href = "http://en.wikipedia.org/wiki/" + articles[i].title;
         anchor.target = "_blank";
         hit.appendChild(anchor);
         
         hit.classList.add('hit', 'col-xs-offset-2', 'col-xs-8', 'well');

         results.appendChild(hit);
         results.classList.add('row')
      }
      document.getElementsByClassName('container')[0].appendChild(results);
    //   document.body.appendChild(results);
   }

   function clearResults() {
       // this may be the first run
       // does the results div exist?
       if (document.getElementById('results') != null) {
            var results = document.getElementById('results');
            if (results != null) {
                document.getElementsByTagName('body')[0].removeChild(results);
            }
       } else {
           // nothing to do, will be created inside writeArticles
       }
   }
   
};