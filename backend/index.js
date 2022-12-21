const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const cors=require("cors")

const ShortUrl = require("./models/ShortUrl.Schema");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.get("/", async (req, res) => {
  let url = await ShortUrl.find();
  res.send(url);
});

app.post("/shortUrl", async (req, res) => {
  const { fullURL, short,clicks } = req.body;
  
  try {
    let Short=await ShortUrl.find({short:short})
    
    if(Short.length>0){
        return res.status(404).json("This URL already exists please try another one else you can leave empty.")
    }else{
        let data = await ShortUrl.create({ fullURL, short, clicks });
    res.status(200).json(data);
    }
    
  } catch (e) {
    res.send(e);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) {
    return res.status(404).send("Invalid URL");
  }
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.fullURL);
});
mongoose
  .connect(
    "mongodb+srv://sharun:123@atlascluster.qwa1fxi.mongodb.net/ShortUrl?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Your server is running on 8080");
    });
  });
