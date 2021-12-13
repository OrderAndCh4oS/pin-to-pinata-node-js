import axios from 'axios';
import {config} from 'dotenv';
config();

const apiKey = process.env.PINATA_API_KEY;
const apiSecret = process.env.PINATA_API_SECRET;

const headers = {
    pinata_api_key: apiKey,
    pinata_secret_api_key: apiSecret
};

const pinataBaseUrl = 'https://api.pinata.cloud';
const queryPinsEndpoint = '/data/pinList';
const pinByHashEndpoint = '/pinning/pinByHash';

const get = (endpoint) => async(offset = 0) => {
    try {
        const response = await axios.get(
            `${pinataBaseUrl}${endpoint}?pageLimit=1000&pageOffset=${offset}`,
            {headers});

        return response?.data || null;
    } catch(e) {
        console.log(`Error getting ${endpoint}`, e);
        return null;
    }
};

const post = (endpoint) => async(data) => {
    try {
        return (await axios.post(`${pinataBaseUrl}${endpoint}`, data,
            {headers})).status;
    } catch(e) {
        console.log(`Error posting to ${endpoint}`, e);
        return null;
    }
};

export const getPins = async() => {
    const pins = [];
    let count;
    let offset = 0;
    do {
        const data = await get(queryPinsEndpoint)(offset);
        count = data?.rows?.length || null;
        if(count) pins.push(...data.rows);
        offset += 1000;
    } while(count);
    return pins;
};
export const postPinByHash = post(pinByHashEndpoint);
