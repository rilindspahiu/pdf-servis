const express = require("express");
const renderTemplate = require("./utils/renderTemplate");
const generatePDF = require("./pdf/generator");

const app = express();

app.use(express.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
    try {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ error: "Missing data" });
        }

        const html = renderTemplate("invoice2", data);

        const pdf = await generatePDF(html);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdf.length
        });

        res.send(pdf);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("PDF service running on port", PORT);
});