import rateLimit from 'axios-rate-limit';
import axios from 'axios';

export const limitedRequest = rateLimit(axios.create(), { maxRequests: 4, perMilliseconds: 1500, maxRPS: 4});