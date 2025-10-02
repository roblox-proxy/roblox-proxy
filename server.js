require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/getpasses", async (req, res) => {
    const userId = req.query.userid;
    if (!userId) return res.status(400).json({ error: "Missing userid" });

    try {
        const url = `https://catalog.roblox.com/v1/search/items?category=GamePass&creatorTargetId=${userId}&limit=30`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch passes" });
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
