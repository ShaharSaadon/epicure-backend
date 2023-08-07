const express = require("express");
const app = express();
const http = require("http").createServer(app);
app.use(express.json());
const port = process.env.PORT || 3030;

http.listen(port, () => {
    console.log("Server is running on port: " + port);
});
