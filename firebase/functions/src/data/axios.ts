import axios from 'axios';
import * as https from 'https';

const httpsAgent = new https.Agent({ keepAlive: true });

const dronesURL = 'https://assignments.reaktor.com/birdnest/drones';
const pilotsURL = 'https://assignments.reaktor.com/birdnest/pilots/';
const dronesInstance = axios.create({
  baseURL: dronesURL,
  timeout: 2000,
  // headers: { Connection: 'keep-alive' },
  httpsAgent: httpsAgent,
});

const pilotsInstance = axios.create({
  baseURL: pilotsURL,
  httpsAgent: httpsAgent,
});

export { dronesInstance, pilotsInstance };
