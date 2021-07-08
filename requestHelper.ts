import axios from "axios";
import { formatBusArrival, sortBusArrivals, TfLBusArrival } from "./tflBusArrivalHelper";

export function requestBusArrivals(busCode: string) {
    return axios.get(`https://api.tfl.gov.uk/StopPoint/${busCode}/Arrivals`)
        .then(
            response => {
                const busData: TfLBusArrival[] = response.data;
                const first5Buses: TfLBusArrival[] = sortBusArrivals(busData);
                console.log(first5Buses.map(formatBusArrival).join('\n'));
            }
        ).catch(
            reason => console.log("Oh no, an error: " + reason.message)
        )
}