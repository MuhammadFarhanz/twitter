import { app } from "./application/app.js";

app.listen(8000, () => {
  console.info("App Start 🔥");
});
// import https from "https";
// import fs from "fs";
// import { app } from "./application/app.js";

// const options = {
//   key: fs.readFileSync("./certificates/key.pem"),
//   cert: fs.readFileSync("./certificates/cert.pem"),
// };
// const server = https.createServer(options, app);

// server.listen(8000, () => {
//   console.info("HTTPS server running on port 8000 🔥");
// });
