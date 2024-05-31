# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


```
Uncaught (in promise) Error: could not coalesce error (error={ "code": -32602, "message": "Log response size exceeded. You can make eth_getLogs requests with up to a 2K block range and no limit on the response size, or you can request any block range with a cap of 10K logs in the response. Based on your parameters and the response size limit, this block range should work: [0x6, 0x1311f1]" }, payload={ "id": 2, "jsonrpc": "2.0", "method": "eth_getLogs", "params": [ { "fromBlock": "0x6", "toBlock": "latest" } ] }, code=UNKNOWN_ERROR, version=6.12.1)
    at makeError (chunk-RMLFIK6Q.js?v=6ab7f531:325:15)
    at JsonRpcProvider.getRpcError (chunk-RMLFIK6Q.js?v=6ab7f531:19088:12)
    at chunk-RMLFIK6Q.js?v=6ab7f531:19222:27
```


```
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    campaign_id BIGINT NOT NULL,
    cid VARCHAR(255) NOT NULL,
    createdBy TEXT NOT NULL
);
```