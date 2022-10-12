// import dotenv from 'dotenv';
// dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import https from "https";
import weatherRoutes from './routes/weatherRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(cors());

// app.use(bp.json()) looks at requests where the Content-Type: application/json
 // header is present and transforms the text-based JSON input into JS-accessible
 //  variables under req.body. app.use(bp.urlencoded({extended: true}) does the
 //  same for URL-encoded requests. the extended: true precises that the req.body
 //   object will contain values of any type instead of just strings.
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let port = process.env.port || 8000;
// var apiKey = process.env.weatherKey;

app.get('/', (req, res)=> {
  res.send('Server side running!')
});

app.use('/store-data', weatherRoutes);

// app.post("/store-data", (req, res) => {
//   // let data = {zip: req.body.zip, country: req.body.country};
//   console.log(req.body);
// });

app.listen(port, function (){
  console.log(`Server is running on port ${port}`);
});
