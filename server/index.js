const express = require("express");
const {connection} = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
require('dotenv').config();
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())


app.use(userRouter)

const PORT = process.env.port || 3001;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});


// "*" Routes handling 404 Not Found
app.all("*", (req, res) => {
    res.status(404);
     if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });