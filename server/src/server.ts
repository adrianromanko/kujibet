import app from "./app";

import express from "express";
import cors from "cors";

import ApiServer from "./api";
/**
 * Start Express server.
 */
const httpServer = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

app.use(cors());
app.use(express.json());
ApiServer.start(app, httpServer);

export default httpServer;
