const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Hospital Welcome");
});


app.post("/",(req,res)=>{
    res.send("we can push the code here")
})

app.put("/",(req,res)=>{
    res.send("we can update here like patch")
})

app.patch("/",(req,res)=>{
    res.send("")
})
app.delete("/",(req,res)=>{
    res.send("We can delete it here")
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
