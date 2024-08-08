const express=require ("express");
const http=require ("node:http")
const app=express();
const path=require("path")
const socketio=require("socket.io")

const server= http.createServer(app);

const io=socketio(server);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
//app.set(express.static(path.join(__dirname,"public")));  
//app.use(express.static('public'));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
     io.emit("received-location",{id:socket.id,...data})
    });
    socket.on("disconnect",function(){
        io.emit("user-diconnected",socket.id);
    })
 console.log("connected");
});

app.get("/",function(req,res){
    res.render("index")
});
server.listen(3000);