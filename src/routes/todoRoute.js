
import express from "express";
import { addTodo } from "../controllers/todoController.js";
import { hasToken } from "../middleware/hasToken.js";


const todoRoute = express.Router();

todoRoute.post('/create' , hasToken, addTodo)




export default todoRoute

