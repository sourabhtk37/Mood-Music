var urlArray = [];

function sendData() {

    //  $("#abc").append('Test');
    //     $("body").append('Test');
    console.log("inside clock");



}

function onAnchorClick(event) {
    chrome.tabs.create({
        selected: true,
        url: event.srcElement.href
    });
    return false;
}

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildPopupDom(divName, data) {
    // $.ajax({
    //     url: "139.59.16.142:8000",
    //     dataType: 'text',
    //     type: 'post',
    //     contentType: 'application/x-www-form-urlencoded',
    //     data:urlArray,
    //     success: function( data, textStatus, jQxhr ){
    //         window.alert(textStatus);
    //     },
    //     error: function( jqXhr, textStatus, errorThrown ){
    //         window.alert("error");
    //     }
    // });

    // $.post("139.59.16.142:8000",
    //      {
    //              name: "John Doe",
    //              age: "42"
    //      },
    //      function(data, textStatus)
    //      {
    //              alert("Response from server: " + data);
    //      });

    var popupDiv = document.getElementById(divName);

    var ul = document.createElement('ul');
    popupDiv.appendChild(ul);

    for (var i = 0, ie = data.length; i < ie; ++i) {
        var a = document.createElement('a');
        a.href = data[i];
        a.appendChild(document.createTextNode(data[i]));
        a.addEventListener('click', onAnchorClick);

        var li = document.createElement('li');
        li.appendChild(a);

        ul.appendChild(li);
    }


}

// Search history to find up to ten links that a user has typed in,
// and show those links in a popup.
function buildTypedUrlList(divName) { //HERE PASSING THE DIV NAME

    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek; // HERE GETTING LAST ONE WEEK TIME

    // Track the number of callbacks from chrome.history.getVisits()
    // that we expect to get.  When it reaches zero, we have all results.
    var numRequestsOutstanding = 0;

    chrome.history.search({
            'text': '', // Return every history item....
            'startTime': oneWeekAgo // that was accessed less than one week ago.
        },
        function(historyItems) {
            // For each history item, get details on all visits.
            for (var i = 0; i < historyItems.length; ++i) { //GETTING THE FUCKING INFO ABOUT EACH HISTORY URL STARTS NOW
                var url = historyItems[i].url;
                var processVisitsWithUrl = function(url) { //GETTING THE FUCKING PARTICULAR URL TURN WISE
                    // We need the url of the visited item to process the visit.
                    // Use a closure to bind the  url into the callback's args.
                    return function(visitItems) {
                        processVisits(url, visitItems);
                    };
                };
                chrome.history.getVisits({
                    url: url
                }, processVisitsWithUrl(url));
                numRequestsOutstanding++;
            }
            if (!numRequestsOutstanding) {
                onAllVisitsProcessed();
            }
        });


    // Maps URLs to a count of the number of times the user typed that URL into
    // the omnibox.
    var urlToCount = {};

    // Callback for chrome.history.getVisits().  Counts the number of
    // times a user visited a URL by typing the address.
    var processVisits = function(url, visitItems) {
        for (var i = 0, ie = visitItems.length; i < ie; ++i) {
            // Ignore items unless the user typed the URL.
            if (visitItems[i].transition != 'typed') {
                continue;
            }

            if (!urlToCount[url]) {
                urlToCount[url] = 0;
            }

            urlToCount[url]++;
        }

        // If this is the final outstanding call to processVisits(),
        // then we have the final results.  Use them to build the list
        // of URLs to show in the popup.
        if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
        }
    };

    // This function is called when we have the final list of URls to display.
    var onAllVisitsProcessed = function() {
        // Get the top scorring urls.
        urlArray = [];
        for (var url in urlToCount) {
            urlArray.push(url);
        }

        // Sort the URLs by the number of times the user typed them.
        urlArray.sort(function(a, b) {
            return urlToCount[b] - urlToCount[a];
        });

        console.log(urlArray);

        buildPopupDom(divName, urlArray.slice(0, 10));

    };
}

document.addEventListener('DOMContentLoaded', function() {

    buildTypedUrlList("typedUrl_div");

});
document.getElementById('abcde').addEventListener("click", function(event) {
    console.log("akfjsdkljfklsfmklsd");
    // $.ajax({
    //     beforeSend: function(xhr, settings) {
    //     url: "139.59.16.142:8000/recieve_url",
    //      function getCookie(name) {
    //        console.log("tk going");
    //          var cookieValue = null;
    //          if (document.cookie && document.cookie != '') {
    //              var cookies = document.cookie.split(';');
    //              for (var i = 0; i < cookies.length; i++) {
    //                  var cookie = jQuery.trim(cookies[i]);
    //                  // Does this cookie string begin with the name we want?
    //                  if (cookie.substring(0, name.length + 1) == (name + '=')) {
    //                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                      break;
    //                  }
    //              }
    //          }
    //          return cookieValue;
    //      }
    //      if (1) {
    //          // Only send the token to relative URLs i.e. locally.
    //          xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    //      }
    //  } ,
    //     dataType: 'text',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data:{"name":"ank"},
    //     success: function( data, textStatus, jQxhr ){
    //         console.log("got it ");
    //     },
    //     error: function( jqXhr, textStatus, errorThrown ){
    //         console.log(error);
    //     }
    // });
    var request = new XMLHttpRequest();

    if (request == null) {
        alert("Unable to create request");
    } else {

        // var url = "http://www.ldoceonline.com/dictionary/manga";
        var url = "http://127.0.0.1:8000/recieve_url";

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                LDResponse(request.responseText);
            }
        }

        request.open("POST", url, true);
        request.send({
            "name": urlArray
        });
    }

    function LDResponse(response) {
        console.log(response);
    }

});
