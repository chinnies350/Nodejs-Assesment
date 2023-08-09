const { create, 
    getUserById,
    getUsers, 
    UpdateUser, 
    deleteUser,
    getUserByUserEmail} = require("./user.service");

const {genSaltSync, hashSync, compareSync}  = require("bcrypt");  //package for the enccryption of  a password 
                                                                  // compareSync is used to compare the password

const {sign} = require("jsonwebtoken");  // This will create a webtoken
const {secretkey} = require("../../auth/token_validation")

const getlogger = require("../../logs/winston")

let logger;

const functionlogger=()=>{
    logger = getlogger()
};

functionlogger();



module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);  //to encrypt the password
        body.password = hashSync(body.password, salt)
        create(body,(err, results)=>{
            if(err){
                console.log(err);
                logger.info("statuscode: 400")
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById:(req, res) =>{
        const id = req.params.id;
        getUserById(id, (err, results)=>{
            if (err) {
                console.log(err);
                return;

            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results

            });
        });
    },

    getUsers:(req, res) =>{
        getUsers((err, results)=>{
            if (err) {
                console.log(err);
                return;

            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results

            });
        });
    },

    UpdateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);  //to encrypt the password
        body.password = hashSync(body.password, salt);
        UpdateUser(body,(err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Failed to update user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },

    deleteUser:(req, res) =>{
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if (err) {
                console.log(err);
                return;

            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: "user deleted successfully"

            });
        });
    },

    login:(req, res) =>{
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) =>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, secretkey,{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
        });
    }
};