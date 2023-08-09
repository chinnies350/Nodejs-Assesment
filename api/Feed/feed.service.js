const pool = require("../../config/database");

const getUserRoleByFeedId = (feedId, callback) => {
    pool.query(
        `SELECT user.role FROM user
         WHERE user.id = ?`,
        [feedId],
        (error, results, fields) => {
            if (error) {
                return callback(error, null);
            }
            if (results.length > 0) {
                const userRole = results[0].role;
                callback(null, userRole);
            } else {
                callback(null, null); // Feed ID doesn't exist or user not found
            }
        }
    );
};

function performSuperAdminDelete(feedId, callBack) {
    // Super Admin-specific deletion query
    pool.query(
        `DELETE FROM feed WHERE id=?`,
        [feedId],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );
}

function performAdminDelete(feedId, callBack) {
    // Admin-specific deletion query
    pool.query(
        `DELETE FROM feed
         INNER JOIN user on user.id = feed.id 
         WHERE feed.id=? AND user.role="Admin"`,
        [feedId],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );
}

module.exports={
    create: (data, callBack) => {
        getUserRoleByFeedId(data.id, (error, userRole) => {
            if (error) {
                return callBack(error);
            }
    
            // Check permission based on user role
            if (userRole !== "Super Admin" && userRole !== "Admin") {
                return callBack({
                    message: "Permission denied"
                });
            }
    
            pool.query(
                `insert into feed(id, name, url, description)
                    values (?, ?, ?, ?)`,
                [
                    data.id,
                    data.name,
                    data.url,
                    data.description
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        });
    },

    getFeeds: callBack =>{
        pool.query(
            `select feed.id,feed.name,feed.url,feed.description,user.role from feed  
             INNER JOIN user on user.id=feed.id`,
            [],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getFeedById: (id, callBack) => {
        getUserRoleByFeedId(id, (error, userRole) => {
            if (error) {
                return callBack(error);
            }
    
            // Check permission based on user role
            if (userRole !== "Super Admin" && userRole !== "User") {
                return callBack({
                    message: "Permission denied"
                });
            }
    
            // User's role is allowed, proceed to fetch feed data
            pool.query(
                `select feed.id,feed.name,feed.url,feed.description,user.role from feed  
                 INNER JOIN user on user.id=feed.id
                 where feed.id=?`,
                [id],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
        });
    },

    UpdateFeed:(data, callBack)=>{
        getUserRoleByFeedId(data.id, (error, userRole) => {
            if (error) {
                return callBack(error);
            }
    
            // Check permission based on user role
            if (userRole !== "Super Admin") {
                return callBack({
                    message: "Permission denied"
                });
            }
        pool.query(
            `update feed set name=?, url=?, description=? where id=?`,
            [
                data.name,
                data.url,
                data.description,
                data.id
            ],
            (error , results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
      });
    },

    deleteFeed: (data, callBack) => {
        getUserRoleByFeedId(data.id, (error, userRole) => {
            if (error) {
                return callBack(error);
            }
    
            if (userRole === "Super Admin") {
                performSuperAdminDelete(data.id, callBack);
            } else if (userRole === "Admin") {
                performAdminDelete(data.id, callBack);
            } else {
                return callBack({
                    message: "Permission denied"
                });
            }
        });
    }
    

    // deleteFeed:(data, callBack)=>{
    //     getUserRoleByFeedId(id, (error, userRole) => {
    //         if (error) {
    //             return callBack(error);
    //         }
        
    //         // Check permission based on user role
    //         if (userRole !== "Super Admin" && userRole !== "Admin") {
    //             return callBack({
    //                 message: "Permission denied"
    //             });
    //         }
        
    //         // User's role is allowed, proceed to delete the feed
    //         pool.query(
    //             `delete from feed where id=?`,
    //             [data.id], 
    //             (error, results, fields) => {
    //                 if (error) {
    //                     return callBack(error);
    //                 }
    //                 return callBack(null, results[0]);
    //             }
    //         );
    //     });
    // }
}