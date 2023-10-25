const admZip = require('adm-zip');

class BLLArchive {
    getZip(zip){
        const archive = new admZip(zip);

        return archive;
    }

    getFilesInZip(archive){
        const listFiles = archive.getEntries();

        return listFiles;
    }

    getListOfTexts(listFiles, archive){
        const textList = [];

        for(const i = 0; i < listFiles; i++){
            if(listFiles[i].entryName.endsWith('.txt')){
                textList.push(archive.readAsText(listFiles[i]));
            }
        }

        return textList;
    }
}

export default BLLArchive;