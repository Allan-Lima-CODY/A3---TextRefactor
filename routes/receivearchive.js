import express from "express";
import BLLArchive from "../BLL/BLLArchive.js";
import Archive from '../BO/BEArchive.js';

const bllArchive = new BLLArchive();
const objArchive = new Archive();
const pathZip = 'C:/Users/allan/OneDrive/Documentos/USJT/Estruturas de Dados e Análise de Algoritmos/A3---TextRefactor/BaseDados-Resumos.zip';
const pathZip2 = 'C:/Users/allan/OneDrive/Documentos/USJT/Estruturas de Dados e Análise de Algoritmos/A3---TextRefactor/BaseDadosResumoAutores_20231120224335.zip';

const archive = express.Router();

const exportedArchives = {
    objArchive: {},
    archive
};

archive.get("/getzip", async (req, res, error) => {
    objArchive.zip = bllArchive.getZip(pathZip);
    objArchive.archives = bllArchive.getFilesInZip(objArchive.zip);
    objArchive.texts = bllArchive.getListOfTexts(objArchive.archives, objArchive.zip);

    Object.assign(exportedArchives.objArchive, objArchive);

    res.json(objArchive.texts);
    res.status(200);
});

archive.get("/getzip2", async (req, res, error) => {
    objArchive.zip = bllArchive.getZip(pathZip2);
    objArchive.archives = bllArchive.getFilesInZip(objArchive.zip);
    objArchive.texts = bllArchive.getListOfTexts(objArchive.archives, objArchive.zip);

    Object.assign(exportedArchives.objArchive, objArchive);

    res.json(objArchive.texts);
    res.status(200);
});

export default exportedArchives;