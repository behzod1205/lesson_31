import { createUser, updateUser, deleteUser, getAllUser, getOneUser } from "../config/db.js";

export const userController = {
    create: async (req, res, next)=>{
        try{
            const { firstName, lastName, email, password, phone_number, address } = req.body
            if (!firstName || !lastName || !email || !password || !phone_number || !address) return res.status(400).json({message: "Firstname, Lastname, Email, Password, Phone Number and Adress are required"})

            const result = await createUser({ firstName, lastName, email, password, phone_number, address })
            res.status(201).json(result)
        }catch(err){
            next(err)
        }
    },
    update: async (req, res, next)=>{
        try{
            const { id } = req.params
            const data = req.body

            const result = await updateUser(id, data)
            if (!result) return res.status(404).json({ message: "User Not Found" })
            
            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    },
    delete: async (req, res, next)=>{
        const { id } = req.params
        try{
            const result = await deleteUser(id)
            if (!result) return res.status(404).json({message: "User Not Found"})

            res.status(200).json({message: "User Deleted Successfully", user: result})
        }catch(err){
            next(err)
        }
    },
    getAll: async (req, res, next)=>{
        try{
            const result = await getAllUser()

            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    },
    getOne: async (req, res, next)=>{
        const { id } = req.params
        try{
            const result = await getOneUser(id)
            if (!result) return res.status(404).json({message: "User Not Found"})

            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    }
}

export default userController