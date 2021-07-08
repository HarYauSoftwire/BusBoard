import axios from "axios";
import { sortBusArrivals, TfLBusArrival } from "./tflBusArrivalHelper";

export async function requestBusArrivals(busCode: string) : Promise<TfLBusArrival[]> {
    const response = await axios.get<TfLBusArrival[]>(
        `https://api.tfl.gov.uk/StopPoint/${busCode}/Arrivals`);
    const busData: TfLBusArrival[] = response.data;
    const first5Buses: TfLBusArrival[] = sortBusArrivals(busData);
    return first5Buses;
}
