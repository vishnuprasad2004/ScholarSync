const router = require("express").Router();
const Message = require('../models/messageModels');
const colors = require("../utils/colors");

router.route("/create-event").get((req, res) => {
    res.render("createEvent")
})

router.route("/create-event").post(async(req, res) => {
    
    let msg = {
        name: req.body.eventName,
        content: req.body.content,
        link: req.body.eventLink || null,
        slug: (req.body.eventName).replace(/\s/g,""),
        branches: req.body.branch
    }
    console.log(msg);
    try{
        const newMessage = await Message.create({
            name: req.body.eventName,
            content: req.body.content,
            link: req.body.eventLink || null,
            slug: (req.body.eventName).replace(/\s/g,""),
            branches: req.body.branch
        })
        console.log(colors.green("ROUTER: Message added"));
        res.redirect("/done")
    } catch(e){
        console.log(colors.red("ROUTER: " + e));
    }
    // await newMessage.save()
})


module.exports = { router };