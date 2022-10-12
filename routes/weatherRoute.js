import express from 'express';
const router = express.Router();
import getWeather from '../controllers/weatherController.js';

router.post('/', getWeather);

export default router;
