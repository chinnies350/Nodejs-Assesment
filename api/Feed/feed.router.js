const { createFeed,getFeeds,getFeedById, UpdateFeed, deleteFeed} = require('./feed.controller');

const router = require("express").Router();

const { checktoken, validateRole} = require("../../auth/token_validation"); // middleware to be used in all the routes

router.post("/",checktoken,validateRole(['Super Admin', 'Admin']),createFeed);
router.get("/",checktoken,validateRole(['Super Admin', 'User']),getFeeds);
router.get("/:id",checktoken,validateRole(['Super Admin', 'User']),getFeedById);
router.put("/",checktoken,validateRole(['Super Admin']),UpdateFeed);
router.delete("/",checktoken,validateRole(['Super Admin', 'Admin']),deleteFeed)

module.exports= router;
