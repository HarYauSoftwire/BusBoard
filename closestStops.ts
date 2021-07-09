import axios from "axios"
import { BusStop } from "./BusStopHelper";
import { logger } from "./logHelper";

export async function getNearbyStops (lat: number, long: number) {
    logger.info(`Requesting list of nearby bus stops for ${lat}, ${long}`)
    const response = await axios.get<{stopPoints: BusStop[]}>(
        `https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=400&lat=${lat}&lon=${long}`
    )
    const busStops: BusStop[] = response.data.stopPoints;
    return busStops;
}

export const getClosestStops = (busStops: BusStop[], max: number) : BusStop[] =>
    busStops.sort(
        (stop1, stop2) => stop1.distance - stop2.distance
    ).slice(0, max);