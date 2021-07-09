import { closest2Stops, getNearbyStops } from "./closestStops";
import { BusStop, BusStopArrivals, filterBusStop } from "./BusStopHelper";
import { getPostcodeData, PostcodeInfo } from "./postcodeHelper";
import { requestBusArrivals } from "./tflRequestHelper";
import { logger } from "./logHelper";


export default async function processPostcode(postcode: string): Promise<BusStopArrivals[]> {
    logger.info(`Processing postcode ${postcode}`);
    const postcodeInfo: PostcodeInfo = await getPostcodeData(postcode);
    const busStops: BusStop[] = await getNearbyStops(postcodeInfo.latitude, postcodeInfo.longitude);
    const closestStops: BusStop[] = closest2Stops(busStops);
    return Promise.all(closestStops.map(
        async (busStop) => {
            return {
                busStop: filterBusStop(busStop),
                arrivals: await requestBusArrivals(busStop.naptanId)
            };
        }
    ));
}
