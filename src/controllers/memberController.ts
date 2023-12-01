import express, { Express } from "express"
import { PrismaClient, Member } from '@prisma/client'
const route = express.Router(); 
const prisma = new PrismaClient()
import { apiResponse } from "../models";
import { error } from "console";

route.get('/', async (req,res)=>{
    var response : apiResponse<Member[]>; 
    try {
        const members = await prisma.member.findMany({orderBy:[{idMember:'asc'}]})
        response = {
            status : "valid",
            message : "GET data berhasil",
            data : members
        }
    } catch {
        response = {
            status : "invalid",
            message : "GET data gagal",
            data : null
        }
    }
    res.json(response)
})

//Get member using id
route.get('/:id', async (req,res)=>{
    const id = Number(req.params.id)
    try{
        const member = await prisma.member.findFirstOrThrow(
            {
                where: { idMember: id}
            }
        )
        res.json(member)
    }catch(error){
        res.json("Member not found!")
    }
})

//Get student using name
route.get('/:name', async (req,res)=>{
    const name = String(req.params.name)
    try{
        const member = await prisma.member.findFirstOrThrow(
            {
                where: { name: name}
            }
        )
        res.json(member)
    }catch(error){
        res.json("Member not found!")
    }
})

route.post('/', async (req, res)=>{
    const { name,birthday,domicile,telp } = req.body
    var response : apiResponse<Member>; 
    try {
        if (name == "" || birthday == "" || domicile == "" || telp == ""){
            throw error
        }
        const CreateMember = await prisma.member.create({
            data : {
                name,
                birthday,
                domicile,
                telp
            }
        })
        response = {
            status : "valid",
            message : "POST data berhasil",
            data : CreateMember
        }
    } catch (error){
        console.log("Error creating member:", (error as Error).message);
        response = {
            status : "invalid",
            message : "POST data gagal",
            data : null
        }
    }
    res.json(response)
})

route.put('/:id', async (req, res)=>{
    const id = Number(req.params.id)
    const { name,birthday,domicile,telp } = req.body
    var response : apiResponse<Member>; 
    try {
        if (name == "" || birthday == "" || domicile == "" || telp == ""){
            throw error
        }
        const updateMember = await prisma.member.update({
            where: {
                idMember : id
            },
            data : {
                name,
                birthday,
                domicile,
                telp
            }
        })
        if (!updateMember) {
            // Member with the specified id was not found
            throw error;
        }
        response = {
            status : "valid",
            message : "PUT data berhasil",
            data : updateMember
        }
    } catch (error){
        console.log("Error updating member:", (error as Error).message);
        response = {
            status : "invalid",
            message : "PUT data gagal",
            data : null
        }
    }
    res.json(response)
})

route.delete('/:id', async (req, res)=>{
    const id = Number(req.params.id)
    var response : apiResponse<Member>; 
    try {
        const deleteMember = await prisma.member.delete({
            where : {
                idMember : id
            }
        })
        if (!deleteMember) {
            // Member with the specified id was not found
            throw error;
        }
        response = {
            status : "valid",
            message : "DELETE data berhasil",
            data : null
        }
    } catch (error){
        console.log("Error deleting member:", (error as Error).message);
        response = {
            status : "invalid",
            message : "DELETE data gagal",
            data : null
        }
    }
    res.json(response)
})

export default route; 