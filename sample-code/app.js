const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const csvModel = require("./csv.db");
const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
// const exePath = path.dirname(require('electron').remote.app.getAppPath('exe'));

const init = (exePath) => {
  fs.writeFileSync(
    path.join(exePath, "/test.txt"),
    `${path.join(exePath, "app", "uploads/test.txt")}`
  );
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(
        null,
        isDev() ? "./uploads" : path.join(exePath, "app", "uploads")
      );
    },
    filename: function (req, file, callback) {
      callback(null, `${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
  const cors = require("cors");

  function isDev() {
    return process.argv0.includes("node_modules");
  }
  const URI =
    "mongodb+srv://anandabinash25:8oQmDrkxNXSUdhGk@cluster0.mdl3dem.mongodb.net/userData?retryWrites=true&w=majority";
  mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(() => console.log("DB connection successful!"));

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    csvModel.find().exec((err, data) => {
      res.send(data);
    });
  });
  // code defines an HTTP POST route handler using Express.js:This route handler listens for POST requests at the root path ("/") of the application. It expects a single file upload with the field name "customFile".
  app.post("/", upload.single("customFile"), async (req, res) => {
    //The code begins with a try block to handle potential errors during the execution of the route handler.
    try {
      console.log(req.file);
      console.log(exePath);
      // fs.writeFileSync(path.join(exePath, '/test.txt'), `${path.join(exePath, '/test.txt')}`)
      console.log(
        isDev()
          ? path.join(exePath, "Electron-mongo", req.file?.path)
          : path.join(exePath, "app", req.file?.path)
      );

      csv()
        .fromFile(req.file?.path)
        .then(async (jsonObj) => {
          for (let res of jsonObj) {
            if (mongoose.isValidObjectId(res?._id)) {
              const exist = await csvModel.findById(res?._id);

              if (!exist) {
                csvModel.create(
                  {
                    ...res,
                    isUpdated: false,
                  },
                  (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              } else {
                const result = await csvModel.updateOne(
                  { _id: res._id },
                  {
                    ...res,
                  }
                );
                console.log(result);

                if (result.modifiedCount > 0) {
                  await csvModel.updateOne(
                    { _id: res._id },
                    {
                      isUpdated: true,
                    }
                  );
                } else {
                  await csvModel.updateOne(
                    { _id: res._id },
                    {
                      isUpdated: false,
                    }
                  );
                }
              }
            }
            // if (!exist) {
            //     csvModel.create(res, (err, data) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //     });
            // }
            else {
              delete res._id;
              console.log(res._id);
              csvModel.create(
                {
                  ...res,
                  isUpdated: false,
                },
                (err, data) => {
                  if (err) {
                    res.send({
                      err,
                    });
                    console.log(err);
                  }
                }
              );
              // csvModel.findByIdAndUpdate(res._id, res, (err, data) => {
              //     if (err) {
              //         console.log(err);
              //     }
              // });
            }
          }
        });
      res.send({ message: "Success" });
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
  app.listen(3000, () => console.log("App running on 3000"));
};

module.exports = {
  init,
};
