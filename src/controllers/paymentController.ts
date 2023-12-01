import express, { Express } from "express";
import { PrismaClient, Payment } from '@prisma/client';
const route = express.Router();
const prisma = new PrismaClient();
import { apiResponse } from "../models";
import { error } from "console";

// Get all payments
route.get('/', async (req, res) => {
    var response: apiResponse<Payment[]>;
    try {
        const payments = await prisma.payment.findMany({ orderBy: [{ idPayment: 'asc' }] });
        response = {
            status: "valid",
            message: "GET data berhasil",
            data: payments
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

// Get payment by id
route.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const payment = await prisma.payment.findUniqueOrThrow({ where: { idPayment: id } });
        res.json(payment);
    } catch (error) {
        res.json("Payment not found!");
    }
});

// Post new payment
route.post('/', async (req, res) => {
    const { payerName, accountNo, timeReceived, status } = req.body;
    var response: apiResponse<Payment>;
    try {
        const createPayment = await prisma.payment.create({
            data: {
                payerName,
                accountNo,
                timeReceived: new Date(timeReceived),
                status
            }
        });
        response = {
            status: "valid",
            message: "POST data berhasil",
            data: createPayment
        };
    } catch (error) {
        console.log("Error creating payment:", (error as Error).message);
        response = {
            status: "invalid",
            message: "POST data gagal",
            data: null
        };
    }
    res.json(response);
});

// Update payment by id
route.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { payerName, accountNo, timeReceived, status } = req.body;
    var response: apiResponse<Payment>;
    try {
        const updatePayment = await prisma.payment.update({
            where: { idPayment: id },
            data: {
                payerName,
                accountNo,
                timeReceived: new Date(timeReceived),
                status
            }
        });
        response = {
            status: "valid",
            message: "PUT data berhasil",
            data: updatePayment
        };
    } catch (error) {
        console.log("Error updating payment:", (error as Error).message);
        response = {
            status: "invalid",
            message: "PUT data gagal",
            data: null
        };
    }
    res.json(response);
});

// Delete payment by id
route.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    var response: apiResponse<Payment>;
    try {
        const deletePayment = await prisma.payment.delete({ where: { idPayment: id } });
        response = {
            status: "valid",
            message: "DELETE data berhasil",
            data: null
        };
    } catch (error) {
        console.log("Error deleting payment:", (error as Error).message);
        response = {
            status: "invalid",
            message: "DELETE data gagal",
            data: null
        };
    }
    res.json(response);
});

export default route;
