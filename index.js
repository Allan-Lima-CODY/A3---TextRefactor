import express from "express";
import exportedRefactorText from './routes/textrefactor.js';
import exportedArchives from "./routes/receivearchive.js";
import exportedGraph from "./routes/graph.js";
import exportedSimilarity from "./routes/similarity.js";

const app = express();

app.use(express.json());
app.use(exportedRefactorText.textRefactor);
app.use(exportedArchives.archive);
app.use(exportedGraph.graphRefactor);
app.use(exportedSimilarity.similarity);

const port = 3000;
app.listen(port, () => {
    console.log("Server activate on port ", port);
});