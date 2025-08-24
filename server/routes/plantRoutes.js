const express = require("express");
const Plant = require("../models/Plant.model");

const router = express.Router();

// @desc Get all plants (with search + filter)
// @route GET /api/plants

// @desc Get all plants (with search + filter + pagination)
// @route GET /api/plants
router.get("/", async (req, res) => {
  try {
    const { name, category, page = 1, limit = 12 } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive
    }

    if (category) {
      query.categories = { $regex: category, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [plants, total] = await Promise.all([
      Plant.find(query).skip(skip).limit(Number(limit)),
      Plant.countDocuments(query),
    ]);

    res.json({
      plants,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


// @desc   Get single plant
// @route  GET /api/plants/:id

router.get("/:id", async (req, res) => {
    try {
         const plant = await Plant.findById(req.params.id);
         if(!plant) return res.status(404).json({ message: "Plant not found "});
         res.json(plant);
    } catch (err) {
         res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// @desc   Add new plant
// @route  POST /api/plants

router.post("/", async (req, res) => {
    try {
        const { name, price, categories, available } = req.body;

        const newPlant = new Plant({
            name,
            price,
            categories,
            available,
        });

        const savedPlant = await newPlant.save();
        res.status(201).json(savedPlant);
    } catch (err){
        res.status(400).json({ message: "Invalid data", error: err.message });
    }
});

// @desc   Update plant
// @route  PUT /api/plants/:id

router.put("/:id", async (req, res) => {
    try {
        const updatedPlant = await Plant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPlant) return res.status(404).json({message: "Plant not found"});
        res.json(updatedPlant);
    } catch (err) {
        res.status(400).json({ message: "Invalid update", error: err.message });
    }
});


// @desc   Delete plant
// @route  DELETE /api/plants/:id

router.delete("/:id", async (req, res) => {
    try {
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
        if (!deletedPlant) return res.status(404).json({ message: "Plant not found"});
        res.json({ message: "Plant deleted successfully"});
    } catch (err) {
         res.status(500).json({message: "Server Error", error: err.message });
    }
});

module.exports  = router;