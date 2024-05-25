import { Server } from "./server";
// import FormData from 'form-data';

const _pinata = import.meta.env.VITE_PINATA_JWT;
const _gateway = import.meta.env.VITE_IPFS_GATEWAY;

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

export async  function getJson(campaigns){
    const fetchPromises = campaigns.map((campaign) => fetch(`${_gateway}/${campaign.cid}`).then(response => response.json()));
    const jsonDataArray = await Promise.all(fetchPromises);
    return jsonDataArray;
}