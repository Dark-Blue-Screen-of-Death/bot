const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.post('/extract', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const content = await page.evaluate(() => document.body.innerText);

        await browser.close();

        res.json({ content });
    } catch (error) {
        console.error('Error extracting content:', error);
        res.status(500).json({ error: 'Failed to extract content' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
