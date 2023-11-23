import express from "express";
import BLLSimilarity from "../BLL/BLLSimilarity.js";
import exportedGraph from "./graph.js";
import Similarity from "../BO/BESimilarity.js";

const bllSimilarity = new BLLSimilarity();

const similarity = express.Router();
const objSimilarity = new Similarity();

const exportedSimilarity = {
    objSimilarity: [],
    similarity
}

similarity.get("/getsimilarity", async (req, res, error) => {
    objSimilarity.similarity = bllSimilarity.relationAllWords(exportedGraph.objGraph);

    exportedSimilarity.objSimilarity = objSimilarity.similarity;

    res.json(exportedSimilarity.objSimilarity);
    res.status(200);
});

export default exportedSimilarity;