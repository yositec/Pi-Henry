const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get("/", async (req, res) => {
    let arraydiets = await Diet.findAll();
    res.send(arraydiets);
  });


module.exports = router;