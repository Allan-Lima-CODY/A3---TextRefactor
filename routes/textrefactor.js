import express from "express";
import BLLTextRefactor from "../BLL/BLLTextRefactor.js";
import Text from '../BO/BEText.js';
import exportedArchives from "./receivearchive.js";

const bllTextRefactor = new BLLTextRefactor();

const textRefactor = express.Router();

const exportedRefactorText = {
    // Agora objText é um array vazio
    objText: [],
    textRefactor
};

textRefactor.get("/refactortext", async (req, res, error) => { //O(m⋅k), onde m é o número total de palavras em todos os textos e k é o número médio de palavras por frase
    if (Object.keys(exportedArchives.objArchive.texts).length !== 0) {
        for (let i = 0; i < exportedArchives.objArchive.texts.length; i++) {
            const objText = new Text();

            objText.text = bllTextRefactor.getText(exportedArchives.objArchive.texts[i]);
            objText.title = bllTextRefactor.getTitle(objText.text);
            objText.predefinedKeywords = bllTextRefactor.getPredefinedKeywords(objText.text);
            objText.phrases = bllTextRefactor.getPhrases(objText.text);
            objText.tokenizedPhrases = bllTextRefactor.tokenizePhrases(objText.phrases);
            objText.removedStopwords = bllTextRefactor.removeStopWords(objText.tokenizedPhrases);

            objText.extractedSortOftenWords = bllTextRefactor.extractKeywordsOften(objText.removedStopwords);
            objText.wordFrequency = bllTextRefactor.sortWords(objText.extractedSortOftenWords);

            // Adiciona o objeto objText ao array
            exportedRefactorText.objText.push(objText);
        }

        res.json(exportedRefactorText);
        res.status(200);
    } else {
        res.json({ msg: "You need texts to tokenize!" });
    }
});

export default exportedRefactorText;