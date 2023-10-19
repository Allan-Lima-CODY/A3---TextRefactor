import express from "express";
import exportedRefactorText from './routes/textrefactor';

const app = express();

app.use(express.json());
app.use(exportedRefactorText.textRefactor);

const port = 3000;
app.listen(port, () => {
    console.log("Server activate on port ", port);
});