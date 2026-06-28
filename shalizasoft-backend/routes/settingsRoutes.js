const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
getSettings,
saveSettings,
} = require("../controllers/settingsController");

router.get(
"/",
authMiddleware,
getSettings
);

router.post(
"/",
authMiddleware,
saveSettings
);

module.exports = router;
