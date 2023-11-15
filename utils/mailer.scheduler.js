const { mailer } = require("./mailer");
const cron = require('node-cron');

const Student = require("../models/studentModals")
const Message = require("../models/messageModels");
const { all } = require("../routes/routes");
const { get } = require("mongoose");

async function getMessages() {
    try {
        let cseaimlMessages = await Message.find({ branches: { $in: ["cseaiml"] } })
        console.log(cseaimlMessages);
        let csedsMessages = await Message.find({ branches: { $in: ["cseds"] } })
        console.log(csedsMessages);
        let cseMessages = await Message.find({ branches: { $in: ["cse"] } })
        console.log(cseMessages);
        return {
            aiml: cseaimlMessages,
            ds: csedsMessages,
            cse: cseMessages
        };
    }
    catch (e) { 
        console.log(e) 
    }
}

// (
//     async() => {
//         const result = await getStudent()
//         console.log("Result: "+result)
//     }
// )()

async function schedule() {
    // minute hour day-of-month month day-of-the-week
    // cron.schedule('1 * * * *', async()=> {
    // });
        const {aiml,ds,cse} = await getMessages()
        console.log("aiml: "+aiml)
        console.log("ds: "+ds)
        console.log("cse"+cse)
    
    const students = await Student.find();
    // users.forEach(user => {
    //     mailer(2,user).then(()=> {
    //         console.log(`SCHEDULER: email sent successfully to ${user.email}`);
    //     }).catch((e)=> {
    //         console.log('SCHEDULER: ' + e.message);
    //     })
    // });
    students.forEach(student => {
        if(student.department == "cseaiml") {
            // console.log(aimlMsgs)
            mailer(student,aiml);
        }
        if(student.department == "cseds") {
            // console.log(dsMsgs)
            mailer(student,ds);
        }
        if(student.department == "cse") {
            // console.log(cseMsgs)
            mailer(student,cse);
        }
    });
}


module.exports = { schedule };