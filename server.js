const   express         = require("express"),
        express_layouts = require("express-ejs-layouts");

const indexRoute = require("./routes/index")  
const apiCalls = require("./routes/apicalls")
const app = express();  

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views'); 
app.use(express_layouts)
app.set('layout','layouts/layout');      
app.use(express.static(__dirname + "/public"));

app.use("/",indexRoute);
app.use("/",apiCalls)



app.listen(process.env.PORT  || 3000 , process.env.IP , function(){
    console.log("Server Started......")
})