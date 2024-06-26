const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createIngredient,
    getIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient,
} = require("../controllers/ingredient");

// VALIDATORS
const { runValidation } = require("../validators");
const { ingredientCreateValidator } = require("../validators/ingredient");

// ROUTES
router
    .route("/")
    .post(protect, ingredientCreateValidator, runValidation, createIngredient)
    .get(protect, getIngredients);

router
    .route("/:id")
    .get(protect, getIngredient)
    .put(protect, updateIngredient)
    .delete(protect, deleteIngredient);

module.exports = router;
