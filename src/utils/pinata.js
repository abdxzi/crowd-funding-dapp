import { Server } from "./server";
// import FormData from 'form-data';

const _pinata = import.meta.env.VITE_PINATA_JWT;

export function pinJson(metadata) {

    const content = {
        ...metadata
    }

    const options = {
        cidVersion: 1
    }

    const data = {
        pinataContent: content,
        pinataOptions: options
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${_pinata}`,
            'Content-Type': 'application/json'
        }
    }

    const req = Server.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, config);
    return req;
}