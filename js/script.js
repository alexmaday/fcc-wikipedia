window.onload = function () {
    // with redirect
    // var qstring = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=prefixsearch&exsentences=3&exlimit=10&exintro=1&inprop=url&redirects=1";
    // without
    var qstring = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=prefixsearch&exsentences=3&exlimit=10&exintro=1&inprop=url";
    var cors = "&origin=*";

    document.getElementById('btnSearch').addEventListener('click', function () {
        var response = "";
        var searchTerm = "";
        searchTerm = document.getElementById('searchTerm').value;
        
        if (!searchTerm) {
            console.log('No keyword detected');
        } else {
            clearResults(); // from previous search
            var http = new XMLHttpRequest();
            var s = "&gpssearch=" + searchTerm;

            http.onreadystatechange = function () {
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

    });

    function writeArticles(response) {
        var results = document.getElementById('results');
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
    }
    function clearResults() {
        document.getElementById('results').innerHTML = "";
    }
};