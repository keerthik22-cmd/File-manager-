const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const publicDirectory = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  let filePath = path.join(publicDirectory, req.url === "/" ? "index.html" : req.url);

  // Get file extension to set correct content-type
  const ext = path.extname(filePath);
  let contentType = "text/html";

  if (ext === ".css") contentType = "text/css";
  else if (ext === ".js") contentType = "text/javascript";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404: File Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
