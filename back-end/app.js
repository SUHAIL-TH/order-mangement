const express =require("express")
const app=express()
const cors=require("cors")
const path = require("path")
const userRoutes=require("./routes/user")

const dbconnect=require("./config/config")
const morgan=require("morgan")


const { swaggerUi, swaggerSpec } = require('./config/swagger-config'); 
dbconnect.dbconnect()



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(cors({
//     credentials:true,
//     origin:'*'
// }))
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);  // Allow all origins
    },
    credentials: true
}));

app.use("/public",express.static("public"))  
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.header("Cache-Control", "no-cache,  no-store, must-revalidate");
    next();
  });
app.use("/public/images",express.static(__dirname+"public/images"))  

app.use(morgan("dev"))
app.use("/",userRoutes)





app.listen(4000,()=>{
    console.log("server started to listing port 4000 ")
})