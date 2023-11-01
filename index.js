import express from "express";
import exportedRefactorText from './routes/textrefactor.js';
import exportedArchives from "./routes/receivearchive.js";

const app = express();

app.use(express.json());
app.use(exportedRefactorText.textRefactor);
app.use(exportedArchives.archive);

const port = 3000;
app.listen(port, () => {
    console.log("Server activate on port ", port);
});