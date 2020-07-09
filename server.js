const   express  =  require("express")
        

const app = express();  
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');       
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res) =>{
    res.render("index")
})




app.listen(process.env.PORT  || 3000 , process.env.IP , function(){
    console.log("Server Started......")
})