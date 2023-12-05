import express, { Express } from "express";
import { PrismaClient, Booking } from '@prisma/client';
const route = express.Router();
const prisma = new PrismaClient();
import { apiResponse } from "../models";
import { error } from "console";

// Get all bookings
route.get('/', async (req, res) => {
    var response: apiResponse<Booking[]>;
    try {
        const bookings = await prisma.booking.findMany({ orderBy: [{ idBooking: 'asc' }] });
        response = {
            status: "valid",
            message: "GET data berhasil",
            data: bookings
        };
    } catch (error) {
        response = {
            status: "invalid",
            message: "GET data gagal",
            data: null
        };
    }
    res.json(response);
});

// Get booking by id
route.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const booking = await prisma.booking.findUniqueOrThrow({ where: { idBooking: id } });
        res.json(booking);
    } catch (error) {
        res.json("Booking not found!");
    }
});

// Post new booking
route.post('/', async (req, res) => {
    const { idRoom, bookerName, bookingMade, reservedTime } = req.body;
    var response: apiResponse<Booking>;
    try {
        const createBooking = await prisma.booking.create({
            data: {
                idRoom: Number(idRoom),
                bookerName,
                bookingMade: new Date(),
                reservedTime: new Date(reservedTime)
            }
        });
        response = {
            status: "valid",
            message: "POST data berhasil",
            data: createBooking
        };
    } catch (error) {
        console.log("Error creating booking:", (error as Error).message);
        response = {
            status: "invalid",
            message: "POST data gagal",
            data: null
        };
    }
    res.json(response);
});

// Update booking by id
route.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { idRoom, bookerName, bookingMade, reservedTime } = req.body;
    var response: apiResponse<Booking>;
    try {
        const updateBooking = await prisma.booking.update({
            where: { idBooking: id },
            data: {
                idRoom,
                bookerName,
                bookingMade: new Date(bookingMade),
                reservedTime: new Date(reservedTime)
            }
        });
        response = {
            status: "valid",
            message: "PUT data berhasil",
            data: updateBooking
        };
    } catch (error) {
        console.log("Error updating booking:", (error as Error).message);
        response = {
            status: "invalid",
            message: "PUT data gagal",
            data: null
        };
    }
    res.json(response);
});

// Delete booking by id
route.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    var response: apiResponse<Booking>;
    try {
        const deleteBooking = await prisma.booking.delete({ where: { idBooking: id } });
        response = {
            status: "valid",
            message: "DELETE data berhasil",
            data: null
        };
    } catch (error) {
        console.log("Error deleting booking:", (error as Error).message);
        response = {
            status: "invalid",
            message: "DELETE data gagal",
            data: null
        };
    }
    res.json(response);
});

export default route;
