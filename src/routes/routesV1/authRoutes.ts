import express from 'express'

const authRoutes = express.Router();

authRoutes.post("/users/login",(req,res) => {
    res.send("Realiza Login.")
});


export {authRoutes};