import axios from "axios";
import { filterTflBusArrival, sortBusArrivals, TfLBusArrival } from "./TflBusArrivalHelper";

export async function requestBusArrivals(busCode: string) : Promise<TfLBusArrival[]> {
    const response = await axios.get<TfLBusArrival[]>(
        `https://api.tfl.gov.uk/StopPoint/${busCode}/Arrivals`);
    const busData: TfLBusArrival[] = response.data;
    const first5Buses: TfLBusArrival[] = sortBusArrivals(busData);
    return first5Buses.map(filterTflBusArrival);
}
