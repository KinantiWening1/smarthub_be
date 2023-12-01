import express, { Express } from "express";
import { PrismaClient, Room } from '@prisma/client';
const route = express.Router();
const prisma = new PrismaClient();
import { apiResponse } from "../models";
import { error } from "console";

// Get all rooms
route.get('/', async (req, res) => {
    var response: apiResponse<Room[]>;
    try {
        const rooms = await prisma.room.findMany({ orderBy: [{ idRoom: 'asc' }] });
        response = {
            status: "valid",
            message: "GET data berhasil",
            data: rooms
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

// Get room by id
route.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const room = await prisma.room.findUniqueOrThrow({ where: { idRoom: id } });
        res.json(room);
    } catch (error) {
        res.json("Room not found!");
    }
});

// Post new room
route.post('/', async (req, res) => {
    const { roomName, roomType, roomSize, capacity, availability, price, description } = req.body;
    var response: apiResponse<Room>;
    try {
        const createRoom = await prisma.room.create({
            data: {
                roomName,
                roomType,
                roomSize,
                capacity,
                availability,
                price,
                description
            }
        });
        response = {
            status: "valid",
            message: "POST data berhasil",
            data: createRoom
        };
    } catch (error) {
        console.log("Error creating room:", (error as Error).message);
        response = {
            status: "invalid",
            message: "POST data gagal",
            data: null
        };
    }
    res.json(response);
});

// Update room by id
route.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { roomName, roomType, roomSize, capacity, availability, price, description } = req.body;
    var response: apiResponse<Room>;
    try {
        const updateRoom = await prisma.room.update({
            where: { idRoom: id },
            data: {
                roomName,
                roomType,
                roomSize,
                capacity,
                availability,
                price,
                description
            }
        });
        response = {
            status: "valid",
            message: "PUT data berhasil",
            data: updateRoom
        };
    } catch (error) {
        console.log("Error updating room:", (error as Error).message);
        response = {
            status: "invalid",
            message: "PUT data gagal",
            data: null
        };
    }
    res.json(response);
});

// Delete room by id
route.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    var response: apiResponse<Room>;
    try {
        const deleteRoom = await prisma.room.delete({ where: { idRoom: id } });
        response = {
            status: "valid",
            message: "DELETE data berhasil",
            data: null
        };
    } catch (error) {
        console.log("Error deleting room:", (error as Error).message);
        response = {
            status: "invalid",
            message: "DELETE data gagal",
            data: null
        };
    }
    res.json(response);
});

export default route;
