import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "1234",
    port: 5432,
});
db.connect();

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "../public")));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
 app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

 app.post("/submit", (req, res) => {
    const { name, college, mono, message } = req.body;
    const today = new Date().toISOString().split("T")[0];

    console.log("Form data:", name, college, mono, message);

    const query = `
        INSERT INTO myport (name, college, mono, message, date)
        VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [name, college, mono, message, today];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting into DB:", err);
            res.status(500).send("Something went wrong. Please try again.");
        } else {
            console.log("Data inserted successfully");
            res.send("Form submitted and saved to database!");
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
