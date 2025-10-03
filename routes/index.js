import { Router } from "express";
import UserRouter from "./user.routes.js";
import PostRouter from "./post.routes.js";
import CommentRouter from "./comments.routes.js";

const MainRouter = Router()

MainRouter.use("/users", UserRouter)
MainRouter.use("/posts", PostRouter)
MainRouter.use("/comments", CommentRouter)

export default MainRouter