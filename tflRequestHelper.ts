import axios from "axios";
import { sortBusArrivals, TfLBusArrival } from "./tflBusArrivalHelper";

export async function requestBusArrivals(busCode: string) : Promise<TfLBusArrival[]> {
    const response = await axios.get<TfLBusArrival[]>(
        `https://api.tfl.gov.uk/StopPoint/${busCode}/Arrivals`);
    const busData: TfLBusArrival[] = response.data;
    const first5Buses: TfLBusArrival[] = sortBusArrivals(busData);
    return first5Buses;
}

// export async function getArrivals(stopId: string) {
//     const response = await axios.get<TfLBusArrival[]>(`${baseUrl}${stopId}${arrivalString}`)
//     return response.data;
// }

// async function start() {
    
//     const arrivals = await getArrivals('490008660N');
    
//     // const firstFiveArrivals = getfirstfive~Arrvals(arrivals)
//     // printArrivalsNicely(firstFivArrivals)
// }
// start();

