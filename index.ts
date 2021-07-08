import readline from "readline";
import { requestBusArrivals } from "./requestHelper";

console.log("Hello world!");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please input a bus stop code...\n", answer => {
    requestBusArrivals(answer);
    rl.close();
})