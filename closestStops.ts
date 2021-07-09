import axios from "axios"
import { BusStop } from "./BusStopHelper";
import { logger } from "./logHelper";

export async function getNearbyStops (lat: number, long: number) {
    logger.info(`Requesting list of nearby bus stops for ${lat}, ${long}`)
    const data = await axios.get<{stopPoints: BusStop[]}>(
        `https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=400&lat=${lat}&lon=${long}`
    )
    const busStops: BusStop[] = data.data.stopPoints;
    return busStops;
}

export function closest2Stops(busStops: BusStop[]) : BusStop[] {
    return busStops.sort(
        (stop1, stop2) => stop1.distance - stop2.distance
    ).slice(0, 2);
}