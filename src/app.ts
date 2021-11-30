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

app.use(
    express.static(path.join(process.cwd(), "client/build"), { maxAge: 31557600000 })
);


app.get("*", function (req, res) {
    res.sendFile(path.join(process.cwd(), 'client/build', 'index.html'))
});


export default app;
