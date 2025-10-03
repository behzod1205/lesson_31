import { getOneUser, postFunctions } from "../config/db.js"

export const postController = {
    create: async (req, res, next)=>{
        try{
            const { title, content, user_id } = req.body
            if(!title || !content || !user_id) return res.status(400).json({message: "Title, Content and User_id are required"})

            const result = await postFunctions.create({ title, content, user_id })
            res.status(201).json(result)
        }catch(err){
            next(err)
        }
    },
    update: async (req, res, next)=>{
        try{
            const { id } = req.params
            const data = req.body

            const result = await postFunctions.update(id, data)
            if (!result) return res.status(404).json({ message: "Post Not Found" })
            
            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    },
    delete: async (req, res, next)=>{
        try{
            const { id } = req.params
            const result = await postFunctions.delete(id)
            if (!result) return res.status(404).json({message: "Post Not Found"})

            res.status(200).json({message: "Post Deleted Successfully", post: result})
        }catch(err){
            next(err)
        }
    },
    getAll: async (req, res, next)=>{
        try{
            const result = await postFunctions.getAll()
            if(!result) return res.status(404).json({message: "Posts Not Found"})

            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    },
    getOne: async (req, res, next)=>{
        try{
            const { id } = req.params

            const result = await postFunctions.getOne(id)
            if (!result) return res.status(404).json({message: "Post Not Found"})

            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    },
    getByUserId: async (req, res, next)=>{
        try{
            const { userId } = req.query

            const user = await getOneUser(userId)
            if(!user) return res.status(404).json({message: "User Not Found"})

            const result = await postFunctions.getByUserId(userId)
            if (!result) return res.status(404).json({message: "Post Not Found"})

            res.status(200).json(result)
        }catch(err){
            next(err)
        }
    }
}