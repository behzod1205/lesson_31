import { Pool } from "pg"
import { slugify } from "../helpers/slugify.js"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "my_blogs",
    password: "bek_1205",
    port: 5432,     
})

async function createUser(user) {
    try{
        const { firstName, lastName, email, password, phone_number, address } = user
        const values = [firstName, lastName, email, password, phone_number, address]
        const query = `
        INSERT INTO users(firstName, lastName, email, password, phone_number, address) 
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;`

        const res = await pool.query(query, values)
        return res.rows[0]
    }catch(err){
        console.error("Error: ", err)
        throw err
    }
}

async function updateUser(id, data) {
    try{
        const keys = Object.keys(data)
        if (keys.length === 0) return null
        
        let values = Object.values(data)
        values.push(id)

        const temp = keys
        .map((key, index)=> `${key} = $${index + 1}`)
        .join(", ")

        const query = `
        UPDATE users
        SET  ${temp} 
        WHERE id = $${values.length} 
        RETURNING *;`

        const res = await pool.query(query, values)
        console.log("User updated", res.rows[0])
        return res.rows[0] || null
    }catch(err){
        console.error("Error: ", err)
        throw err
    }
}

async function deleteUser(id) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`

    try{
        const res = await pool.query(query, [id])
        if (res.rows.length === 0) {
            console.log("User not found")
            return null
        }
        console.log("User ", res.rows[0])
        return res.rows[0]
    }catch(err){
        console.log(err)
    }
}

async function getOneUser(id) {
    const query = `
    SELECT *
    FROM users 
    WHERE id = $1;`

    const res = await pool.query(query, [id])
    return res.rows[0]
}

async function getAllUser() {
    const query = `
    SELECT *
    FROM users;`

    const res = await pool.query(query)
    return res.rows
}

export { createUser, updateUser, deleteUser, getAllUser, getOneUser }

export const postFunctions = {
    create: async(post)=>{
        try{
            const { title, content, user_id } = post
            const slug = slugify(title)
            const values = [title, content, slug, user_id ]
            const query = `
            INSERT INTO 
            posts (title, content, slug, user_id) 
            VALUES
            ($1, $2, $3, $4)
            RETURNING *;`
            
            const res = await pool.query(query, values)
            return res.rows[0]
        }catch(err){
            console.error("Error: ", err)
        }
    },
    update: async(id, post)=>{
        try{
            const keys = Object.keys(post)
            if (keys.length === 0) return null

            let values = Object.values(post)
            values.push(id)

            const temp = keys
            .map((key, index)=> `${key} = $${index + 1}`)
            .join(", ")

            const query = `
            UPDATE posts
            SET  ${temp} 
            WHERE id = $${values.length} 
            RETURNING *;`

            const res = await pool.query(query, values)
            console.log("Post updated", res.rows[0])
            return res.rows[0] || null
        }catch(err){
            console.error("Error: ", err)
        }
    },
    delete: async(id)=>{
        const query = `DELETE FROM posts WHERE id = $1 RETURNING *;`

        try{
            const res = await pool.query(query, [id])
            if (res.rows.length === 0) {
                console.log("Post not found")
                return null
            }
            console.log("Post: ", res.rows[0])
            return res.rows[0]
        }catch(err){
            console.log(err)
        }
    },
    getAll: async()=>{
        try{
            const query = `
            SELECT *
            FROM posts;`

            const res = await pool.query(query)
            return res.rows
        }catch(err){
            console.error("Error: ", err)
        }
    },
    getOne: async (id)=>{
        try{
            const query = `
            SELECT *
            FROM posts 
            WHERE id = $1;`

            const res = await pool.query(query, [id])
            return res.rows[0]
        }catch(err){
            console.error("Error: ", err)
        }
    },
    getByUserId: async (userId)=>{
        try{
            const query = `
            SELECT *
            FROM posts 
            WHERE user_id = $1;`

            const res = await pool.query(query, [userId])
            return res.rows
        }catch(err){
            console.error("Error: ", err)
        }
    }
}

export const commentFunctions = {
    create: async(comment)=>{
        try{
            const { content, user_id, post_id } = comment
            const created_at = new Date().toLocaleDateString()
            const values = [ content, user_id, post_id, created_at ]

            const query = `
            INSERT INTO 
            comments (content, post_id, user_id, created_at) 
            VALUES($1, $2, $3, $4)
            RETURNING *;`

            const res = await pool.query(query, values)
            return res.rows[0]
        }catch(err){
            console.error("Error: ", err)
        }
    },
    update: async(id, comment)=>{
        try{
            const keys = Object.keys(comment)
            if (keys.length === 0) return null

            let values = Object.values(comment)
            values.push(id)

            const temp = keys
            .map((key, index)=> `${key} = $${index + 1}`)
            .join(", ")

            const query = `
            UPDATE comments
            SET  ${temp} 
            WHERE id = $${values.length} 
            RETURNING *;`

            const res = await pool.query(query, values)
            console.log("Comment updated", res.rows[0])
            return res.rows[0] || null
        }catch(err){
            console.error("Error: ", err)
        }
    },
    delete: async(id)=>{
        const query = `DELETE FROM comments WHERE id = $1 RETURNING *;`

        try{
            const res = await pool.query(query, [id])
            if (res.rows.length === 0) {
                console.log("Comment not found")
                return null
            }
            console.log("Comment: ", res.rows[0])
            return res.rows[0]
        }catch(err){
            console.log(err)
        }
    },
    getAll: async()=>{
        try{
            const query = `
            SELECT *
            FROM comments;`

            const res = await pool.query(query)
            return res.rows || null
        }catch(err){
            console.error("Error: ", err)
        }
    },
    getOne: async (id)=>{
        try{
            const query = `
            SELECT *
            FROM comments 
            WHERE id = $1;`

            const res = await pool.query(query, [id])
            return res.rows[0]
        }catch(err){
            console.error("Error: ", err)
        }
    }
}