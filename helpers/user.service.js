import { postFunctions } from "../config/db.js"

export async function getUserAndPosts(userId) {
    const posts = await postFunctions.getAll()
    const userPosts = posts.filter(p=>p.user_id===userId)
    return userPosts
}