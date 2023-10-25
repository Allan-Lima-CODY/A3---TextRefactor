import express, { text } from "express";
import BLLTextRefactor from "../BLL/BLLTextRefactor";
const bllTextRefactor = new BLLTextRefactor();
import Text from '../BO/BEText';
const objText = new Text();

const textRefactor = express.Router();

const exportedRefactorText = {
    objText,
    textRefactor
};

textRefactor.post("/tokenizetext", async (req, res, error) => {
    if (objText.text != null) {
        objText.textTokenized = bllTextRefactor.tokenizeText(objText.text);
        objText.tokenizedWithoutStopWords = bllTextRefactor.removeStopWords(objText.textTokenized);
        objText.stemmed = bllTextRefactor.lemmatizeTokens(objText.tokenizedWithoutStopWords);
        objText.extractKeywords = bllTextRefactor.extractKeywords(objText.stemmed);
        objText.extractedSortOftenWords = bllTextRefactor.oftenWords(objText.extractKeywords);
        objText.textTheme = bllTextRefactor.identifyTheme(objText.extractedSortOftenWords);
    } else {
        res.json({ msg: "You need a text to tokenize something!" });
    }
});

export default exportedRefactorText;