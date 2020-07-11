require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify:false})        
const db = mongoose.connection;
db.on('error',(error) => {console.error(error)});
db.once('open', () =>{ console.log("connected to database")});
mongoose.Promise = Promise;

const channel = require("./channel")
module.exports.channel = channel;