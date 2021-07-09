import readline from "readline";
import { formatBusArrivals } from "./TflBusArrivalHelper";
import getBusStopArrivalsNearPostcode from "./getBusStopArrivalsNearPostcode";
import { BusStopArrivals } from "./BusStopHelper";
import { logger } from "./logHelper";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please input a postcode...\n", async answer => {
    try {
        const busStopArrivals: BusStopArrivals[] = await getBusStopArrivalsNearPostcode(answer);
        console.log(busStopArrivals.map(formatBusArrivals).join('\n\n'));
    }
    catch (error) {
        logger.error(error.message);
    }
    rl.close();
})