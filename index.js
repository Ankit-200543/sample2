const express=require("express")
const app=express();
const path = require("path");


const http=require("http");
const socketio=require("socket.io");
const server=http.createServer(app);
const io=socketio(server);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 8000;


io.on("connection", function (socket) {
    console.log("User connected:", socket.id);

   socket.on("send-location", ({ latitude, longitude }) => {
        console.log(`Location received: ${latitude}, ${longitude}`);
     io.emit("receive-location", { latitude, longitude });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/new",(req,res)=>{
    res.render("new")
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
