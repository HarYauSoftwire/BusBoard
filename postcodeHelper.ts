import axios from "axios";

export type PostcodeInfo = {
    postcode: string;
    longitude: number;
    latitude: number;
}

export async function getPostcodeData(postcode: string) : Promise<PostcodeInfo> {
    try {
        const response = await axios.get(`https://api.postcodes.io/postcodes?q=${postcode}`);
        const postcodeData: PostcodeInfo[] = response.data.result;
        return postcodeData[0];
    }
    catch (error) {
        throw new Error("Failed to get postcode data");
    }
}