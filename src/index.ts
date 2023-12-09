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
	origin: (origin: any, callback:any) => {
	  const whitelist = [/.*localhost.*$/, /.*smarthubcoworking.netlify.app.*$/ ];
  
	  if (process.env.NODE_ENV === "DEV" || whitelist.includes(origin)) {
		return callback(null, true);
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
  };
  
app.use(cors(corsOptions));

  
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

