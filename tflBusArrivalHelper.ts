import { BusStopArrivals } from "./BusStopHelper";

export type TfLBusArrival = {
    lineName: string;
    destinationName: string;
    timeToStation: number;
}

export function sortBusArrivals(busArrivals: TfLBusArrival[]) : TfLBusArrival[] {
    return busArrivals.sort(
        (bus1, bus2) => bus1.timeToStation - bus2.timeToStation
    ).slice(0, 5);
}

function formatBusArrival(busArrival: TfLBusArrival) : string {
    return `Bus #${busArrival.lineName} to ${busArrival.destinationName}` +
     ` arriving in ${Math.round(busArrival.timeToStation / 60)} mins`;
}

export function formatBusArrivals(busStopArrivals: BusStopArrivals) : string {
    return busStopArrivals.busStop.commonName + ' ' +
        busStopArrivals.busStop.stopLetter + '\n' +
        busStopArrivals.arrivals.map(formatBusArrival).join('\n');
}

export function filterTflBusArrival(bigArrival: TfLBusArrival) : TfLBusArrival {
    return {
        lineName: bigArrival.lineName,
        destinationName: bigArrival.destinationName,
        timeToStation: bigArrival.timeToStation
    }
}