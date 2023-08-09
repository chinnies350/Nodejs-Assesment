const pool = require("../config/database");
const { verify } =require("jsonwebtoken");  //to verify the jsonwebtoken
const secretkey = 'qwe1234' 

module.exports ={
    checktoken: (req, res, next) =>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);   // 7 index which will start from the 8th position
            verify(token, secretkey,(err, decoded)=>{
                if(err){
                    res.json({
                        success:0, 
                        message: "Invalid token"
                    });
                }else{
                    next();  // used to pass a control from one middleware to another
                }
            })

        }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized user"
            });
        }
    },

    // validateRole: (allowedRoles) => {
    //     return (req, res, next) => {
    //         let token = req.get("authorization");
    //         if (token) {
    //             token = token.slice(7); // Remove "Bearer " prefix
    //             verify(token, secretkey, (err, decoded) => {
    //                 if (err) {
    //                     res.json({
    //                         success: 0,
    //                         message: "Invalid token"
    //                     });
    //                 } else {
    //                     const userRole = user.role;
    //                     if (allowedRoles.includes(userRole)) {
    //                         next(); // User's role is allowed, proceed to the next middleware
    //                     } else {
    //                         res.json({
    //                             success: 0,
    //                             message: "Permission denied! Unauthorized role"
    //                         });
    //                     }
    //                 }
    //             });
    //         } else {
    //             res.json({
    //                 success: 0,
    //                 message: "Access denied! Unauthorized user"
    //             });
    //         }
    //     };
    // },
    validateRole: (allowedRoles) => {
        return (req, res, next) => {
            const feedId = req.body.id; // Assuming the feed ID is passed in the request body
            // Make a database query to retrieve the user role based on feedId
            pool.query(
                `SELECT user.role FROM user
                 WHERE user.id = ?`,
                [feedId],
                (error, results, fields) => {
                    if (error) {
                        return res.json({
                            success: 0,
                            message: "Error querying database"
                        });
                    }
                    if (results.length > 0) {
                        const userRole = results[0].role;
    
                        if (allowedRoles.includes(userRole)) {
                            next(); // User's role is allowed, proceed to the next middleware
                        } else {
                            res.json({
                                success: 0,
                                message: "Permission denied! Unauthorized role"
                            });
                        }
                    } else {
                        res.json({
                            success: 0,
                            message: "Feed not found"
                        });
                    }
                }
            );
        };
    },
    secretkey
};

