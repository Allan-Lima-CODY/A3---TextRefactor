import express from "express";
import BLLGraphRefactor from "../BLL/BLLGraphRefactor.js";
import exportedRefactorText from "./textrefactor.js";
import Graph from "../BO/BEGraph.js";

const bllGraphRefactor = new BLLGraphRefactor();

const graphRefactor = express.Router();
const objGraph = new Graph();

const exportedGraph = {
    objGraph: [],
    graphRefactor
}

class PolishGraph {
    polishGraph() {
        const wordFrequency = bllGraphRefactor.extractWordFrequency(exportedRefactorText.objText);
        const removedNumbers = bllGraphRefactor.removeNumbers(wordFrequency);
        const removedLittleWords = bllGraphRefactor.removeLittleWords(removedNumbers);
        const allWords = bllGraphRefactor.onlyAllWords(removedLittleWords);
        const removedEmptyLists = bllGraphRefactor.removeEmptyLists(allWords);

        return removedEmptyLists;
    }
}

const polishGraph = new PolishGraph();

graphRefactor.get("/graphrefactor", async (req, res, error) => {
    objGraph.graph = bllGraphRefactor.createGraph(polishGraph.polishGraph());

    exportedGraph.objGraph = objGraph.graph;

    res.json(exportedGraph.objGraph);
    res.status(200);
});

export default exportedGraph;