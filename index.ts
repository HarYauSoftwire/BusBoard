import readline from "readline";
import { formatBusArrivals } from "./TflBusArrivalHelper";
import processPostcode from "./processPostcode";
import { BusStopArrivals } from "./BusStopHelper";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please input a postcode...\n", async answer => {
    const busStopArrivals: BusStopArrivals[] = await processPostcode(answer);
    console.log(busStopArrivals.map(formatBusArrivals).join('\n\n'));
    rl.close();
})