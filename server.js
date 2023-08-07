const express = require("express");
const app = express();
const http = require("http").createServer(app);
app.use(express.json());
const port = process.env.PORT || 3030;

// const authRoutes = require("./api/auth/auth.routes");

const logger = require("./services/logger.service");
logger.info("Hi", 90, "Bobo");

http.listen(port, () => {
    console.log("Server is running on port: " + port);
});
