const Word = require("../models/Word");
const cloudinary = require("cloudinary").v2;
const imageDataUri = require("image-data-uri");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDI_API_KEY,
  api_secret: process.env.CLOUDI_API_SECRET,
});

exports.createWord = async (req, res) => {
  let encoded = imageDataUri.encode(req.file.buffer, req.file.mimetype);
  let response = await cloudinary.uploader.upload(encoded, {
    transformation: [{ height: 250, crop: "scale" }],
  });
  const word = new Word();
  word.word = req.body.word;
  word.grade = req.body.grade;
  word.imgPath = response.url;
  try {
    word.save((err, room) => {
      res.status(200).json({
        url: response.url,
        id: room.id,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteWord = async (req, res) => {
  console.log(req.params.id);
  try {
    const word = await Word.findOneAndRemove({
      _id: req.params.id,
    });

    if (!word) {
      return res.status(404).json({ msg: "Word not found" });
    }

    return res.status(200).json({ msg: "Word deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteWords = async (req, res) => {
  try {
    const word = await Word.deleteMany({
      grade: req.params.grade,
    });
    if (!word) {
      return res.status(404).json({ msg: "Grade not found" });
    }
    return res.status(200).json({ msg: "Grade deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getWords = async (req, res) => {
  try {
    // console.log("getted");
    const words = await Word.find({});
    return res.status(200).json({ words });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getWordsGrade = async (req, res) => {
  try {
    // console.log("getted");
    const words = await Word.find({
      grade: req.params.grade,
    });
    return res.status(200).json({ words });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.editWord = async (req, res) => {
  try {
    const word = await Word.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      { word: req.body.word },
      { new: true }
    );
    res.status(200).json(word);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};
