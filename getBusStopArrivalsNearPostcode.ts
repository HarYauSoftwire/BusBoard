import { getClosestStops, getNearbyStops } from "./closestStops";
import { BusStop, BusStopArrivals, filterBusStop } from "./BusStopHelper";
import { getPostcodeData, PostcodeInfo } from "./postcodeHelper";
import { requestBusArrivals } from "./tflRequestHelper";
import { logger } from "./logHelper";


export default async function getBusStopArrivalsNearPostcode(postcode: string): Promise<BusStopArrivals[]> {
    logger.info(`Processing postcode ${postcode}`);
    const postcodeInfo: PostcodeInfo = await getPostcodeData(postcode);
    const busStops: BusStop[] = await getNearbyStops(postcodeInfo.latitude, postcodeInfo.longitude);
    const closestStops: BusStop[] = getClosestStops(busStops, 2);
    return Promise.all(closestStops.map(
        async (busStop) => {
            return {
                busStop: filterBusStop(busStop),
                arrivals: await requestBusArrivals(busStop.naptanId)
            };
        }
    ));
}
