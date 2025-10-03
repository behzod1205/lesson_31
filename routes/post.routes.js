import { Router } from "express";
import { postController } from "../controller/posts.controller.js";

const PostRouter = Router()

PostRouter.get("/", (req, res, next)=>{
    const { userId } = req.query

    if (userId) return postController.getByUserId(req, res, next)


    return postController.getAll(req, res, next)
})

PostRouter.get("/:id", postController.getOne)
PostRouter.post("/", postController.create)
PostRouter.put("/:id", postController.update)
PostRouter.delete("/:id", postController.delete)

export default PostRouter