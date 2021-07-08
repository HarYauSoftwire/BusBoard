import axios from "axios"

export type BusStop = {
    commonName: string;
    lineGroup: {
        naptanIdReference: string;
    }[];
    distance: number;
}

export function getNearbyStops (lat: number,long: number) {
    return axios.get(
        `https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanOnstreetBusCoachStopPair,NaptanOnstreetBusCoachStopCluster,NaptanBusCoachStation&radius=400&lat=${lat}&lon=${long}`
    )
    .then(
        data => {
            const busStops: BusStop[] = data.data.stopPoints;
            return busStops;
        }
    )
}

export function closest2Stops(busStops: BusStop[]) : BusStop[] {
    return busStops.sort(
        (stop1, stop2) => stop1.distance - stop2.distance
    ).slice(0, 2);
}