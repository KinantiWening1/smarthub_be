import express, { Express } from "express"
import { PrismaClient, Booking } from '@prisma/client'
const route = express.Router(); 
const prisma = new PrismaClient()
import { apiResponse } from "../models";
import { error } from "console";