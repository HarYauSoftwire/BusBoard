import axios from "axios";
import { formatBusArrival, sortBusArrivals, TfLBusArrival } from "./tflBusArrivalHelper";

export function requestBusArrivals(busCode: string) : Promise<TfLBusArrival[]> {
    return axios.get(`https://api.tfl.gov.uk/StopPoint/${busCode}/Arrivals`)
        .then(
            response => {
                const busData: TfLBusArrival[] = response.data;
                const first5Buses: TfLBusArrival[] = sortBusArrivals(busData);
                return first5Buses;
                // console.log(first5Buses.map(formatBusArrival).join('\n'));
            }
        );
}