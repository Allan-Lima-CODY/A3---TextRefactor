import admZip from 'adm-zip';
import chardet from 'chardet';
import iconv from 'iconv-lite';

class BLLArchive {
    getZip(zip) {
        const archive = new admZip(zip);

        return archive;
    }

    getFilesInZip(archive) {
        const listFiles = archive.getEntries();

        return listFiles;
    }

    getListOfTexts(listFiles, archive) {
        const textList = [];
    
        for (let i = 0; i < listFiles.length; i++) {
            if (listFiles[i].entryName.endsWith('.txt')) {
                const buffer = archive.readFile(listFiles[i]);
                const encoding = chardet.detect(buffer);

                const content = iconv.decode(buffer, encoding);
    
                textList.push(content);
            }
        }
    
        return textList;
    }
}

export default BLLArchive;