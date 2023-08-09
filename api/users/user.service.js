const pool = require("../../config/database");

module.exports={
    create:(data, callBack)=>{
        pool.query(
            `insert into user(name,role,email,password)
                values(?,?,?,?)`,
            [
                data.name,
                data.role,
                data.email,
                data.password
            ],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        )
    },

    getUsers: callBack =>{
        pool.query(
            `select id,name,role,email,password from user`,
            [],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserById : (id,callBack) =>{
        pool.query(
            `select id,name,role,email,password from user where id=?`,
            [id],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },

    UpdateUser:(data, callBack)=>{
        pool.query(
            `update user set name=?, role=?, email=?, password=? where id=?`,
            [
                data.name,
                data.role,
                data.email,
                data.password,
                data.id
            ],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },

    deleteUser:(data, callBack)=>{
        pool.query(
            `delete from user where id=?`,
            [
                data.id
            ],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        
        );
    },

    getUserByUserEmail:(email, callBack)=>{
        pool.query(
            `select * from user where email=?`,
            [
                email
            ],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        
        );
    }
    
};