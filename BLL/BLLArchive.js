import admZip from 'adm-zip';
import chardet from 'chardet';
import iconv from 'iconv-lite';

class BLLArchive {
    getZip(zip) {
        //Pega o arquivo zip no destino que a variável na rota armazena e cria uma instância de arquivo zip.
        const archive = new admZip(zip);

        //Retorno.
        return archive;
    }

    getFilesInZip(archive) {
        //Cria uma lista com todos os arquivos TXTs que tem dentro do arquivo zipado.
        const listFiles = archive.getEntries();

        //Retorno.
        return listFiles;
    }

    getListOfTexts(listFiles, archive) {
        const textList = [];
    
        //Passa por todos os arquivos da lista
        for (let i = 0; i < listFiles.length; i++) {
            //Se as extensões dos arquivos forem .txt...
            if (listFiles[i].entryName.endsWith('.txt')) {
                //Para cada arquivo dentro da lista, o mesmo é lido.
                const buffer = archive.readFile(listFiles[i]);
                //E depois é detectado o tipo de codificação usada no arquivo.
                const encoding = chardet.detect(buffer);

                //E depois de detectada a codificação, o conteúdo do mesmo é decodificado.
                const content = iconv.decode(buffer, encoding);
    
                //E após decodificado, o conteúdo do arquivo é adicionado a uma lista de strings.
                textList.push(content);
            }
        }
    
        //Retorno.
        return textList;
    }
}

export default BLLArchive;