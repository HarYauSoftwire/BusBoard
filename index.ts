import readline from "readline";
import { closest2Stops, getNearbyStops } from "./closestStops";
import { getPostcodeData } from "./postcodeHelper";
import { formatBusArrival } from "./tflBusArrivalHelper";
import { requestBusArrivals } from "./tflRequestHelper";

console.log("Hello world!");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question("Please input a bus stop code...\n", answer => {
//     requestBusArrivals(answer);
//     rl.close();
// })

rl.question("Please input a postcode...\n", answer => {
    getPostcodeData(answer)
    .then(data => {
        getNearbyStops(data.latitude,data.longitude)
        .then(stops => {
            Promise.all(closest2Stops(stops).map(stop => 
                requestBusArrivals(stop.lineGroup[0].naptanIdReference)))
            .then(busStopBuses => {
                console.log(busStopBuses.map(
                    buses => buses.map(formatBusArrival).join('\n')
                ).join('\n'))
            });
        })
    });
    rl.close();
})