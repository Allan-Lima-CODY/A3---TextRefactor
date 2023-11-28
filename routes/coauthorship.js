import express from "express";
import BLLCoAuthorShip from "../BLL/BLLCoAuthorship.js";
import CoAuthorship from '../BO/BECoAuthorship.js';
import exportedArchives from "./receivearchive.js";

const bllCoAuthorShip = new BLLCoAuthorShip();
const objCoAuthorship = new CoAuthorship();

const coauthorship = express.Router();

const exportedCoAuthorship = {
    objCoAuthorship: {},
    coauthorship
};

coauthorship.get("/getcoauthorship", async (req, res, error) => {
    objCoAuthorship.texts = bllCoAuthorShip.getTexts(exportedArchives.objArchive);
    objCoAuthorship.coauthorship = bllCoAuthorShip.getCoAuthoship(objCoAuthorship.texts.texts);
    objCoAuthorship.centrality = bllCoAuthorShip.addCountToAuthorString(objCoAuthorship.coauthorship);

    Object.assign(exportedCoAuthorship.objCoAuthorship, objCoAuthorship);

    res.json(objCoAuthorship.centrality);
    res.status(200);
});

export default exportedCoAuthorship;