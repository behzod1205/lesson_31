import { createUser, updateUser, deleteUser, getAllUser, getOneUser, commentFunctions } from "../config/db.js";
import { getUserAndPosts } from "../helpers/user.service.js";

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
    },
    findUserAndPosts: async function (req, res, next) {
            try{
                const { id } = req.params
                const { page, limit, search} = req.query
                const userId = parseInt(id)
                const User = await getOneUser(userId)
                if(!User) return res.status(404).json({message: `#User with ID ${id} not found`})
                
                const UserName = `${User.firstname} ${User.lastname}`
                const posts = await getUserAndPosts(userId)
                
                let filteredPosts = posts
    
                if (search) {
                    filteredPosts = filteredPosts.filter(post =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.content.toLowerCase().includes(search.toLowerCase())
                    )
                }
    
                const pageNum = parseInt(page) || 1
                const limitNum = parseInt(limit) || 5
    
                const startIndex = (pageNum - 1) * limitNum
                const endIndex = pageNum * limitNum
    
                const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    
                res.send({
                    User: UserName,
                    posts: paginatedPosts,
                    total: filteredPosts.length,
                    page: pageNum,
                    limit: limitNum
                })
    
            }catch(err){
                next(err)
            }
    },
    findUserAndOnePost:  async function (req, res, next) {
        try{
            const { id, postId } = req.params
            const userId = parseInt(id)
            const User = await getOneUser(userId)
            if(!User) return res.status(404).json({message: `#User with ID ${id} not found`})
                
            const UserName = `${User.firstname} ${User.lastname}`
            const posts = await getUserAndPosts(userId)
                
            let filteredPost = posts.find(post=>post.id ===parseInt(postId)) || []
    
            res.send({
                    User: UserName,
                    post: filteredPost
            })
    
        }catch(err){
            next(err)
        }
    }, 
    findUserAndOneWithComments: async function (req, res, next) {
        try{
            const { id, postId } = req.params
            const { page, limit, search} = req.query
            const userId = parseInt(id)
            const PostId = parseInt(postId)
            
            const comments = await commentFunctions.getAll()

            const User = await getOneUser(userId)
            if(!User) return res.status(404).json({message: `#User with ID ${id} not found`})
            
            const UserName = `${User.firstname} ${User.lastname}`
            const posts = await getUserAndPosts(userId)
            const Coms = comments.filter(com=>(com.post_id===PostId&&com.user_id===userId))

            let filteredPost = posts.find(post=>post.id ===PostId) || []

            if(!Coms) return res.status(400).json({message: `#Post with Id ${PostId} doesn't have any commnets`})
            if (search){
                Coms = Coms.filter(c=>c.content.toLowerCase().includes(search.toLowerCase()))
            }
                
            const pageNum = parseInt(page) || 1
            const limitNum = parseInt(limit) || 5

            const startIndex = (pageNum - 1) * limitNum
            const endIndex = pageNum * limitNum

            const paginatedComs = Coms.slice(startIndex, endIndex)

            res.send({
                User: UserName,
                post: filteredPost,
                comments: paginatedComs,
                page: pageNum,
                limit: limitNum
            })

        }catch(err){
            next(err)
        }
    }
    
}

export default userController