import express, { Express } from "express";
import { PrismaClient, Query } from '@prisma/client';
const route = express.Router();
const prisma = new PrismaClient();
import { apiResponse } from "../models";
import { error } from "console";

// Get all queries
route.get('/', async (req, res) => {
    var response: apiResponse<Query[]>;
    try {
        const queries = await prisma.query.findMany({ orderBy: [{ idQuery: 'asc' }] });
        response = {
            status: "valid",
            message: "GET data berhasil",
            data: queries
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

// Get query by id
route.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const query = await prisma.query.findUniqueOrThrow({ where: { idQuery: id } });
        res.json(query);
    } catch (error) {
        res.json("Query not found!");
    }
});

// Post new query
route.post('/', async (req, res) => {
    const { name, date, question, answer } = req.body;
    var response: apiResponse<Query>;
    try {
        const createQuery = await prisma.query.create({
            data: {
                name,
                date: new Date(date),
                question,
                answer
            }
        });
        response = {
            status: "valid",
            message: "POST data berhasil",
            data: createQuery
        };
    } catch (error) {
        console.log("Error creating query:", (error as Error).message);
        response = {
            status: "invalid",
            message: "POST data gagal",
            data: null
        };
    }
    res.json(response);
});

// Update query by id
route.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, date, question, answer } = req.body;
    var response: apiResponse<Query>;
    try {
        const updateQuery = await prisma.query.update({
            where: { idQuery: id },
            data: {
                name,
                date: new Date(date),
                question,
                answer
            }
        });
        response = {
            status: "valid",
            message: "PUT data berhasil",
            data: updateQuery
        };
    } catch (error) {
        console.log("Error updating query:", (error as Error).message);
        response = {
            status: "invalid",
            message: "PUT data gagal",
            data: null
        };
    }
    res.json(response);
});

// Delete query by id
route.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    var response: apiResponse<Query>;
    try {
        const deleteQuery = await prisma.query.delete({ where: { idQuery: id } });
        response = {
            status: "valid",
            message: "DELETE data berhasil",
            data: null
        };
    } catch (error) {
        console.log("Error deleting query:", (error as Error).message);
        response = {
            status: "invalid",
            message: "DELETE data gagal",
            data: null
        };
    }
    res.json(response);
});

export default route;
