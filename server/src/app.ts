import express from "express";
// import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// app.use((req, res, next) => {
//     if (req.header("x-forwarded-proto") !== "https") {
//         res.redirect(`https://${req.header("host")}${req.url}`);
//     } else {
//         next();
//     }
// });

const rootPath = path.join(__dirname, "..", "..");
const staticPath = path.join(rootPath, "client", "build");

console.log(`Serving static files from: ${staticPath}`);
app.use("/", express.static(staticPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "/index.html"));
});


export default app;
