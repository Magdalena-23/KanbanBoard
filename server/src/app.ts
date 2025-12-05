import express, { Application } from "express";
import columnRoutes from "./routes/columnRoutes";
// import issueRoutes from "./routes/issueRoutes";

const app: Application = express();

app.use(express.json());

app.use("/columns", columnRoutes);
// app.use("/issues", issueRoutes);

export default app;
