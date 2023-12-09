import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"

import bookingRoutes from './controllers/bookingController';
import memberRoutes from './controllers/memberController';
import roomRoutes from './controllers/roomController';

const app = express()
const NODE_ENV = ( process.env.NODE_ENV || "PROD" ).toUpperCase();
dotenv.config()
const port = process.env.PORT || 5001;
const database_url = process.env.DATABASE_URL;

if ( NODE_ENV !== "PROD" && NODE_ENV !== "DEV" && NODE_ENV !== "TEST" ) throw new Error( NODE_ENV );
if ( database_url === undefined ) throw new Error( "DATABASE_URL is not provided" )

const corsOptions = {
	origin: ['http://localhost:4173', 'https://smarthubcoworking.netlify.app/'],
	credentials: true,
	optionSuccessStatus: 200,
  };
  
const whitelist = [ /.*localhost.*$/, "https://smarthubcoworking.netlify.app/" ];
  
app.use(cors({
	origin: (origin, callback) => {
	  if (NODE_ENV === "DEV" || origin === undefined) return callback(null, true);
	  for (const originCheck of whitelist) {
		if (typeof originCheck === 'string' && originCheck === origin) {
		  return callback(null, true);
		} else if (originCheck instanceof RegExp && originCheck.test(origin as string)) {
		  return callback(null, true);
		}
	  }
	  return callback(new Error("Not Allowed by CORS"));
	},
	credentials: true,
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
	  "Authorization",
	  "Origin",
	  "Accept",
	  "Content-Type",
	  "X-Forwarded-For",
	],
	optionsSuccessStatus: 204,
}));
  
app.use( express.json() )

app.all( "/", ( req: Request, res: Response ) => {
  return res.status( 200 ).json( {
    message: "OK"
  } )
} )

app.use( '/booking', bookingRoutes )
app.use( '/member', memberRoutes )
app.use( '/room', roomRoutes )

app.listen( port, () => {
  console.log( `Server is running on port : ${port}` )
} )

