import { TfLBusArrival } from "./TflBusArrivalHelper";

export type BusStop = {
    commonName: string;
    naptanId: string;
    stopLetter: string;
    distance: number;
};

export type BusStopArrivals = {
    busStop: BusStop;
    arrivals: TfLBusArrival[];
};

export function filterBusStop(bigBusStop: BusStop) : BusStop {
    return {
        commonName: bigBusStop.commonName,
        naptanId: bigBusStop.naptanId,
        stopLetter: bigBusStop.stopLetter,
        distance: bigBusStop.distance
    };
}