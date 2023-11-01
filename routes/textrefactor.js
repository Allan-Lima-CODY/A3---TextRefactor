import express from "express";
import BLLTextRefactor from "../BLL/BLLTextRefactor.js";
import Text from '../BO/BEText.js';
import exportedArchives from "./receivearchive.js";

const bllTextRefactor = new BLLTextRefactor();

const textRefactor = express.Router();

const exportedRefactorText = {
    objText: {
        textRefactored: []
    },
    textRefactor
};

textRefactor.get("/refactortext", async (req, res, error) => {
    if (Object.keys(exportedArchives.objArchive.texts).length !== 0) {
        for(let i = 0; i < exportedArchives.objArchive.texts.length;i++){
            const objText = new Text();

            objText.text = bllTextRefactor.getText(exportedArchives.objArchive.texts[i]);
            objText.title = bllTextRefactor.getTitle(objText.text);
            objText.predefinedKeywords = bllTextRefactor.getPredefinedKeywords(objText.text);
            objText.phrases = bllTextRefactor.getPhrases(objText.text);
            objText.tokenizedPhrases = bllTextRefactor.tokenizePhrases(objText.phrases);
            objText.removedStopwords = bllTextRefactor.removeStopWords(objText.tokenizedPhrases);
            objText.lemmatized = bllTextRefactor.lemmatizeTokens(objText.removedStopwords);
            objText.extractedSortOftenWords = bllTextRefactor.extractKeywordsOften(objText.lemmatized);
            objText.wordFrequency = bllTextRefactor.sortWords(objText.extractedSortOftenWords);

            exportedRefactorText.objText.textRefactored.push(objText);
        }

        res.json(exportedRefactorText.objText.textRefactored);
        res.status(200);
    } else {
        res.json({ msg: "You need a texts to tokenize!" });
    }
});

export default exportedRefactorText;