import axios from "axios";

export type PostcodeInfo = {
    postcode: string;
    longitude: number;
    latitude: number;
}

export function getPostcodeData(postcode: string) {
   return axios.get(`https://api.postcodes.io/postcodes?q=${postcode}`)
    .then(
        response => {
            const postcodeData: PostcodeInfo[] = response.data.result;
            return postcodeData[0];
        }
    )

}