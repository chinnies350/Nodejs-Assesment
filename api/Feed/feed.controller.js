const { create, getFeeds, getFeedById, UpdateFeed, deleteFeed} = require("./feed.service");

module.exports = {
    createFeed: (req, res) => {
        const body = req.body;
        create(body,(err, results)=>{
            if(err){
                console.log(err);
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

    getFeeds:(req, res) =>{
        getFeeds((err, results)=>{
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

    getFeedById:(req, res) =>{
        const id = req.params.id;
        getFeedById(id, (err, results)=>{
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

    UpdateFeed:(req, res)=>{
        const body = req.body;
        UpdateFeed(body,(err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success:0,
                    message:"Failed to update feed"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Duccessfully"
            });
        });
    },

    deleteFeed:(req, res) =>{
        const data = req.body;
        deleteFeed(data, (err, results)=>{
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
                data: "feed deleted successfully"

            });
        });
    }
}