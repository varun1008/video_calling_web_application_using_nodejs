const   express         = require("express"),
        express_layouts = require("express-ejs-layouts"),
        db              = require("./models/db")

const app = express();  
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views'); 
app.use(express_layouts)
app.set('layout','layouts/layout');      
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res) =>{
    res.render("index")
})

app.get("/channels",(req,res) =>{
    db.channel.find()
    .then((data) => {
       res.json(data)
    })   
})

app.post("/channel1/:id/:cid",(req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u1" : false}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._id":req.params.cid}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
})

app.post("/channel2/:id/:cid",(req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u2" : false}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._id":req.params.cid}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
})

app.post("/channelClose/:id/:cid",(req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u1" : true,
                                    "channels.$[channelFilter].u2" : true}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._cid":req.params.channel}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
})


app.listen(process.env.PORT  || 3000 , process.env.IP , function(){
    console.log("Server Started......")
})