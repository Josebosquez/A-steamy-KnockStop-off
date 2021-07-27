const express = require("express");
const router = express.Router();

router.get("/get-api-key", async function (req, res) {
    try {
        res.json({
            message: "success",
            payload: process.env.API_KEY,
        });
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message });
    }
});

module.exports = router;

