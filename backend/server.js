const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dataModel = require("./models/dataModel");
const blogData = require("./data/data.json");
const cors = require("cors");

dotenv.config();
app = express();
app.use(express.json());
app.use(cors());

//Connect to mongodb databases
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(process.env.PORT || 500, (err) => {
      if (err) console.log(err);
      console.log(`Server started at PORT:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Database Connection Failed", error));

app.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    let filteredData;

    if (
      category &&
      (category === "technology" ||
        category === "health" ||
        category === "education")
    ) {
      filteredData = await dataModel.find({ category: category });
    } else {
      filteredData = await dataModel.find();
    }

    // If no data is found, return an empty array instead of null
    if (!filteredData) {
      filteredData = [];
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/", async (req, res) => {
  const { title, description, content, image_url, category, password } =
    req.body;
  if (password == "") {
    return res.status(401).json({ error: "Enter Password" });
  } else if (password !== "qwerty") {
    return res.status(401).json({ error: "Unauthorized : Incorrect Password" });
  }
  try {
    const dataAdded = await dataModel.create({
      title: title,
      description: description,
      content: content,
      image_url: image_url,
      category: category,
      password: password,
    });
    res.status(201).json(dataAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleData = await dataModel.findById(id);
    res.status(200).json(singleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/create", async (req, res) => {
  const { title, description, content, image_url, category } = req.body;
  try {
    const dataAdded = await dataModel.create({
      title: title,
      description: description,
      content: content,
      image_url: image_url,
      category: category,
    });
    res.status(201).json(dataAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
