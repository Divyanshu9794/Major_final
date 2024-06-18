const { log } = require("console");

const spawn = require("child_process").spawn;
const predict = async (req, res, next) => {
  const pythonProcess = spawn("python3", [
    "main.py",
    req.body.nitrogen,
    req.body.phosphorous,
    req.body.potassium,
    req.body.temperature,
    req.body.humidity,
    req.body.pH,
    req.body.rainfall,
  ]);
  pythonProcess.stdout.on("data", (data) => {
    mystr = data.toString();
    myjson = JSON.parse(mystr);
    req.body.predictedCrop = myjson.Data;
    console.log(myjson.Data);
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  res.setTimeout(3000, () => {
    next();
  });
};

module.exports = predict;
