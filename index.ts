import readline from "readline";
import { BusStop, closest2Stops, getNearbyStops } from "./closestStops";
import { getPostcodeData, PostcodeInfo } from "./postcodeHelper";
import { formatBusArrivals, TfLBusArrival } from "./tflBusArrivalHelper";
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

rl.question("Please input a postcode...\n", async answer => {
    const postcodeInfo: PostcodeInfo = await getPostcodeData(answer);
    const busStops: BusStop[] = await getNearbyStops(postcodeInfo.latitude,postcodeInfo.longitude);
    const closestStops: BusStop[] = closest2Stops(busStops);
    const busStopInfos: string[] = await Promise.all(
        closestStops.map(async busStop =>
            formatBusArrivals(
                await requestBusArrivals(busStop.lineGroup[0].naptanIdReference),
                busStop.commonName
            )
        ));
    console.log(busStopInfos.join('\n\n'));
    rl.close();
})