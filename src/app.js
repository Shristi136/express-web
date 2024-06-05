const express =require ("express");
const app = express();
const path = require("path");
const port =process.env.PORT || 8000;

const static_path = path.join(__dirname,"../Public");
app.use(express.static(static_path));

app.get("",(req,res)=>{
    res.send("welcome to home page");
})



app.get("*",(req,res)=>{
    res.status(404);
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})