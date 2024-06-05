const mongoose = require("mongoose");
const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const DB =
  "mongodb+srv://flakesunday:flakekung42@cluster0.dw6yku2.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0";
//mongoose
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection successful");
  });

const todolistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  descriptions: {
    type: String,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
});
const todolist = mongoose.model("todolist", todolistSchema);
// api

app.get("/list", async (req, res) => {
  // res.status(200).json({
  //   status: "success",
  // });
  try {
    const list = await todolist.find();

    res.status(200).json({
      status: "success",
      data: list,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.log(err);
  }
});
app.use(bodyParser.json());
app.post("/list", async (req, res) => {
  try {
    const addList = await todolist.create(req.body);
    res.status(200).json({
      status: "succss",
      data: {
        addList,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    // console.log(err);
  }

  // get each
  app.get("/:id", (req, res) => {
    res.send("succes test");
  });
});

app.use(express.json());
app.listen(3000, () => {
  console.log("hello");
});
