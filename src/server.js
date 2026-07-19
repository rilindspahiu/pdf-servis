const express = require("express");
const cors = require("cors"); // 1. Import cors
const renderTemplate = require("./utils/renderTemplate");
const generatePDF = require("./pdf/generator");

const app = express();

// 2. Configure CORS to allow your Netlify frontend
app.use(cors({
    origin: "https://prismatic-cucurucho-13a174.netlify.app",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));

// Optional: Quick health-check route to help wake up the free tier instance faster
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

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