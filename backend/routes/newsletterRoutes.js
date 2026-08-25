
const express = require("express");

const router = express.Router();

const newsletterController = require("../controllers/newsletterController");

// Inscreve um e-mail na Newsletter
router.post("/newsletter", newsletterController.cadastrarNewsletter);

module.exports = router;