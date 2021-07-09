import { closest2Stops, getNearbyStops } from "./closestStops";
import { BusStop, BusStopArrivals, filterBusStop } from "./BusStopHelper";
import { getPostcodeData, PostcodeInfo } from "./postcodeHelper";
import { requestBusArrivals } from "./tflRequestHelper";


export default async function processPostcode(answer: string): Promise<BusStopArrivals[]> {
    const postcodeInfo: PostcodeInfo = await getPostcodeData(answer);
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
