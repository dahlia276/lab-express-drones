const express = require('express');
const DronesModel = require('../models/Drones.model');

// require the Drone model here

const router = express.Router();

router.get('/drones', async (req, res) => {
  try {const dronesFromDB = await DronesModel.find()
  console.log(dronesFromDB)
  res.render("drones/list", {dronesFromDB})
}  catch(e) {
  res.render("error");
  console.log(`An error occured ${e}`);
}
});

router.get('/drones/create', async (req, res, next) => {
  res.render("drones/create-form") 
});

router.post('/drones/create', async (req, res, next) => {
  try {
    const {name, propellers, maxSpeed} = req.body;
    await DronesModel.create({name, propellers, maxSpeed});
    res.redirect("/drones");
  } catch(e) {
    res.render('drones/create-form')
  }
});

router.get('/drones/:droneId/edit', async (req, res, next) => {
  const drone = await DronesModel.findById(req.params.droneId)
  res.render("drones/update-form", {drone})
});

router.post('/drones/:droneId/edit', async (req, res, next) => {
  try {
    const droneId = req.params.droneId;
  const {name, propellers, maxSpeed} = req.body;
  await DronesModel.findByIdAndUpdate(droneId, {
    name,
    propellers,
    maxSpeed
  });
  res.redirect("/drones");
  } catch(e) {
    res.render("drones/update-form")
  }
});

router.post('/drones/:droneId/delete', async (req, res, next) => {
  const droneId = req.params.droneId;
  console.log('deleting', droneId);
  await DronesModel.findByIdAndRemove(droneId)
  res.redirect("/drones")
});

module.exports = router;
