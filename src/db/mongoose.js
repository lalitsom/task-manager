const mongoose = require('mongoose');


// const databaseName = "task-manager";
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";
mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model("User",{
//     name:{
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })


// const me = new User({
//     name: "Lalit",
//     age: "Mike"
// })


// me.save().then(()=>{
//     console.log("Success",me);
// }).catch((error)=>{
//     console.log("Error",error)
// })




const Task = mongoose.model("Bus",{
    description:{
        type: String
    },
    completed: {
        type: Boolean
    }
})


const task = new Task({
    description: "complete course",
    completed: true
})


task.save().then(()=>{
    console.log("Success",task);
}).catch((error)=>{
    console.log("Error",error)
})