const { createUser, 
    getUserById, 
    getUsers, 
    UpdateUsers,
    deleteUser,
    login} = require('./user.controller');

const router = require("express").Router();
const { checktoken} = require("../../auth/token_validation"); // middleware to be used in all the routes

router.post("/",checktoken,createUser);
router.get("/",checktoken,getUsers);
router.get("/:id",checktoken, getUserById);
router.put("/",checktoken, UpdateUsers);
router.delete("/",checktoken, deleteUser);
router.post("/login", login);

module.exports= router;