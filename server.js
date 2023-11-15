const express = require("express");
require("dotenv").config();
const colors = require("./utils/colors")
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnect = require("./db")
const { schedule } = require('./utils/mailer.scheduler');
const Message = require('./models/messageModels');
const { router } = require("./routes/routes")

app.set('view engine', 'ejs');
dbConnect()

// to access the inputs given in the form inside the req.body.[name attribute]
app.use(express.urlencoded({ extended: false }));

app.use("/",router)


app.get("/",(req, res) => {
    res.redirect("/create-event");
})

app.get("/done",(req, res) => {
    res.status(200).send("<h1>Message Submitted</h1>")
})

app.get("/create-event", (req, res) => {
    res.render("createEvent")
})


app.post("/create-event",async(req, res) => {
    
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
    } catch (e){
        console.log(e)
    }
    // await newMessage.save()
    res.redirect("/done")
})



app.listen(PORT, () => {
    console.log(colors.green("SERVER:") + `listening on http://localhost:${PORT}`)
    schedule()
});
