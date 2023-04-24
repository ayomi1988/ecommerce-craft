import dotenv from "dotenv";
import http from "http";
import { app } from "./app";
import { config } from "./config/config";
import { log } from "./logs/logger";
import bodyParser from 'body-parser';

dotenv.config();

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))


const port = config.serverPort.port || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  log.info(`[Server]: I am running at http://localhost:${port}`);
});


export default server;
