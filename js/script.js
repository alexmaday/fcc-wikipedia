
window.onload = function() {
   var searchTerm = "global";

   var endpoint = "https://en.wikipedia.org/w/api.php?action=opensearch&format=jsonfm&namespace=0&limit=20&callback=showResults";
   // setup button event - get search term
   document.getElementById('btnSearch').onclick = function() {
      // get the searchterm
      searchTerm = document.getElementById('search').value;
      if (!searchTerm) alert('Wut');

      // build the querystring
      var url = endpoint + "&search=" + searchTerm;
      // inject the script
      sc = document.createElement('script');
      sc.src = url;
      sc.type = "text/javascript";
      
      document.head.appendChild(sc);
   };

   function showResults(data) {
      alert.log("Inside showResults()");
      var searchTerm = data[0];
      var titles = data[1];
      var extracts = data[2];
      var links = data[3];

      var results = "";
      for (var i = 0; i < titles.length; i++) {
         results += "<h1>" + titles[i] + "</h1>";
         results += "<p>" + extracts[i] + "</p>";
         results += '<p>Read <a href="' + links[i] + '">more</a></p><br>';

      }
      document.getElementById('results').innerHTML = results;

   }

};