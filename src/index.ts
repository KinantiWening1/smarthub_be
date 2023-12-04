import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"

import bookingRoutes from './controllers/bookingController';
import memberRoutes from './controllers/memberController';
import roomRoutes from './controllers/roomController';

const app = express()
dotenv.config()
const port = process.env.PORT || 5000;
const database_url = process.env.DATABASE_URL;

if ( database_url === undefined ) throw new Error( "DATABASE_URL is not provided" )

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use( cors( corsOptions ) )
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

