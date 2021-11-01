import express from "express";
import nodersa from "node-rsa";
import fs from "fs";
import multer from "multer";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

var upload = multer({ storage: storage });

app.post(
  "/",
  upload.fields([
    {
      name: "secret",
      maxCount: 1,
    },
    {
      name: "key",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    const files = req.files;

    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }

    const privateKey = fs.readFileSync("./uploads/key", "utf8");
    const decrypted = new nodersa(privateKey).decrypt(
      fs.readFileSync("./uploads/secret"),
      "utf8"
    );

    res.send(decrypted);
  }
);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
