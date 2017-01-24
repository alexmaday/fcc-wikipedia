window.onload = function() {
   // with redirect
   var qstring = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=prefixsearch&exsentences=3&exlimit=10&exintro=1&inprop=url&redirects=1";

   // and without
   // var qstring = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=prefixsearch&exsentences=3&exlimit=10&exintro=1&inprop=url";
   var cors = "&origin=*";

   document.getElementById('btnSearch').addEventListener('click', getArticles);

   function getArticles() {
      var response = "";
      var searchTerm = "";
      searchTerm = document.getElementById('searchTerm').value;

      if (!searchTerm) {
         console.log('No keyword detected');
      } else {
         var http = new XMLHttpRequest();
         
         // monitor http status
         http.addEventListener('progress', updateProgress);
         http.addEventListener('load', transferComplete);
         http.addEventListener('error', transferFailed);
         http.addEventListener('abort', tranferCanceled);
         
         var s = "&gpssearch=" + searchTerm;

         http.onreadystatechange = function() {
            console.log('Ready state: ' + http.readyState);
            if (http.readyState === 4 && http.status == 200) {
               response = JSON.parse(http.responseText);
               writeArticles(response.query.pages);
               console.log('Got it');
            }
         };

         http.open('GET', qstring + s + cors);
         http.send(null);
      }

   }

   function writeArticles(response) {
      clearResults(); // from previous search
      var results = document.createElement('div'); results.setAttribute('id', 'results');
      var keys = Object.keys(response);

      keys.forEach(function(key) {
         var title = response[key].title;
         var extract = response[key].extract;
         var link = response[key].fullurl;
         var hit = document.createElement('div');
         hit.classList.add('hit');
         hit.innerHTML = '<h2>' + title + '</h2>' + '<p>' + extract + '</p><p><a href="' + link + '" target="_blank"></a></p>';
         results.appendChild(hit);
      });
      document.body.appendChild(results);
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
   
   // xmlhttprequest utilities
   // progress on transfers from the server to the client (downloads)
   function updateProgress(oEvent) {
      if (oEvent.lengthComputable) {
         var percentComplete = oEvent.loaded / oEvent.total;
      } else {
         // unable to compute progress information since the total size is unknown
      }
   }
   function transferComplete(evt) {
      console.log('The transfer is complete');
   }
   function transferFailed(evt) {
      console.log('An error occurred while transferring the file');
   }
   function tranferCanceled(evt) {
      console.log('The transfer has been cancelled by the user');
   }
   
};