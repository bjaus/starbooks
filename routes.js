const express = require("express");
const router = express.Router();
const sanitize = require("./util/sanitize");

// Models
const Satellite = require("./models/Satellite");
const Collection = require("./models/Collection");

// @route GET api/satellites
// @desc  Fetch satellite data
// @acess Public
router.get("/satellites", (req, res) => {
  Collection.find()
    .populate("satellite", ["satellite_id", "timestamp"])
    .then(result => {
      const records = result.map(res => {
        let satId = res.satellite.satellite_id;
        return {
          // satellite_id: res.satellite.satellite_id,
          satellite_id: parseInt(satId) ? parseInt(satId) : satId,
          timestamp: res.satellite.timestamp,
          set_id: parseInt(res.set_id) ? parseInt(res.set_id) : res.set_id,
          status: res.status,
          condition: res.condition,
          errors: res._errors
        };
      });
      const sortByMultipleKeys = keys => {
        return (a, b) => {
          if (keys.length === 0) return 0;
          _ = keys[0];
          key = _[0];
          reverse = _[1];
          if (a[key] < b[key]) return reverse ? 1 : -1;
          if (a[key] > b[key]) return reverse ? -1 : 1;
          return sortByMultipleKeys(keys.slice(1))(a, b);
        };
      };
      res.json(
        records.sort(
          sortByMultipleKeys([["timestamp", true], ["set_id", false]])
        )
      );
    })
    .catch(err => console.log(err));
});

// @route POST api/upload
// @desc  Upload from JSON file
// @acess public
router.post("/upload", (req, res) => {
  const file = req.files.file;
  const fileData = JSON.parse(file.data);
  const dataArray = sanitize(fileData);
  const result = [];
  for (let i = 0; i < dataArray.length; i++) {
    let rec = dataArray[i];
    if (!rec.satellite_id) continue;
    let query = {
      satellite_id: rec.satellite_id
    };
    Satellite.findOneAndUpdate(
      query,
      {
        timestamp: rec.timestamp
      },
      {
        new: true,
        upsert: true
      }
    )
      .then(res => {
        for (let j = 0; j < rec.collection.length; j++) {
          let collection = rec.collection[j];
          let query = {
            satellite: res._id,
            set_id: collection.set_id
          };
          Collection.findOneAndUpdate(query, collection, {
            new: true,
            upsert: true
          }).catch(err => console.log(err));
        }
        result.push(rec);
      })
      .catch(err => console.log(err));
  }
  res.json({
    successful: true
  });
});

module.exports = router;
