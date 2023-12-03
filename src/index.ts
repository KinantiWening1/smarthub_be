import express, { Express } from "express";
const app = express()
const port = process.env.PORT || 5000; 
import bookingRoutes from './controllers/bookingController';
import memberRoutes from './controllers/memberController'; 
import roomRoutes from './controllers/roomController'; 

const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,           
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.listen(port, () =>{
    console.log(`Server is running on port : ${port}`)
})

app.use(express.json())
app.use('/booking', bookingRoutes)
app.use('/member', memberRoutes)
app.use('/room', roomRoutes)
