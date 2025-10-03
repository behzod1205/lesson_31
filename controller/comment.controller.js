import { commentFunctions } from "../config/db.js"

export const commentController = {
    create: async (req, res, next)=>{
            try{
                const { content, user_id, post_id } = req.body
                if (!content || !user_id || !post_id) return  res.status(400).json({message: "Content, User_id and Post_Id are required"})
    
                const result = await commentFunctions.create({ content, user_id, post_id })
                res.status(201).json(result)
            }catch(err){
                next(err)
            }
        },
        update: async (req, res, next)=>{
            try{
                const { id } = req.params
                const data = req.body
    
                const result = await commentFunctions.update(id, data)
                if (!result) return res.status(404).json({ message: "Comment Not Found" })
                
                res.status(200).json(result)
            }catch(err){
                next(err)
            }
        },
        delete: async (req, res, next)=>{
            try{
                const { id } = req.params
                const result = await commentFunctions.delete(id)
                if (!result) return res.status(404).json({message: "Comment Not Found"})
    
                res.status(200).json({message: "Comment Deleted Successfully", comment: result})
            }catch(err){
                next(err)
            }
        },
        getAll: async (req, res, next)=>{
            try{
                const result = await commentFunctions.getAll()
                if(!result) return res.status(404).json({message: "Comments Not Found"})
    
                res.status(200).json(result)
            }catch(err){
                next(err)
            }
        },
        getOne: async (req, res, next)=>{
            try{
                const { id } = req.params
    
                const result = await commentFunctions.getOne(id)
                if (!result) return res.status(404).json({message: "Comment Not Found"})
    
                res.status(200).json(result)
            }catch(err){
                next(err)
            }
        }
}