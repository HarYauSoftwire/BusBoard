const { formatBusArrivals } = require("../TflBusArrivalHelper");


function getArrivalsData(postcode) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${postcode}`, true);
    
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        if (xhttp.status == 200) {
            var arrivalsData = JSON.parse(xhttp.response);
            document.getElementById("results").innerHTML = `<h2>Results</h2>` + 
                formatBusStopArrivals(arrivalsData);
        }
        else if (xhttp.status == 400 || xhttp.status == 500) {
            document.getElementById("results").innerHTML = 
                `<p>Error: ${xhttp.response}</p>`;
        }
        else {
            document.getElementById("results").innerHTML = 
                `<p>Error ${xhttp.status}</p>`;
        }
    }
    
    xhttp.send();
}

function formatBusStopArrivals(arrivalsData) {
    const htmlstring = arrivalsData.map(formatBusStopArrival)
        .join('\n');
        console.log(htmlstring);
        return htmlstring;
}

function formatBusStopArrival(arrival) {
    return `<h3>${arrival.busStop.commonName}` + 
    ` ${arrival.busStop.stopLetter || ''}</h3>\n` + 
    `<ul>${arrival.arrivals.map(formatBusArrival)
        .join('\n')}</ul>`;
}

function formatBusArrival(arrival) {
    return `<li>${Math.round(arrival.timeToStation / 60)}` +
        ` minutes: ${arrival.lineName} to` +
        ` ${arrival.destinationName}</li>`;
}