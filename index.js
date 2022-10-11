import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import Routes from "./src/routes/index.js";
const swaggerYaml = YAML.load("./swagger.yaml");

const app = express();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Content-Type",
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

Routes(app);
//connect to swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
// to catch a 404 and send to error handler
app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: `Route ${req.url} Not found`,
  })
);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});
// Create app
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

export default server;
