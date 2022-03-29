import rateLimit from 'axios-rate-limit';
import axios from 'axios';

export const limitedRequest = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000 });