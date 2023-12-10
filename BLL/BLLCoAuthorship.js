class BLLCoAuthorShip {
    getTexts(archives) { //O(n), onde n é o tamanho do archives
        //Método para pegar os textos retornados pela BLLArchive.
        return archives;
    }

    getCoAuthorship(archives) { //O(n⋅(m+k)) , onde n é o número de arquivos, m é o número médio de linhas por arquivo e k é o número médio de autores por linha
        // Mapeie os arquivos para obter a lista de coautoria
        const authorList = archives.map((item) => {
            // Divida as linhas do item com base na quebra de linha
            const lines = item.split("\r\n");
    
            // Divida os autores na última linha com base na vírgula
            const authors = lines[lines.length - 1].split(",");
    
            // Crie um objeto com chaves "Author1" e "Author2" representando os dois autores
            return {
                "Author1": authors[0],
                "Author2": authors[1],
            };
        });
    
        // Retorne a lista de coautoria
        return authorList;
    }

    countAuthors(authorList) { //O(m⋅(k+n)), onde m é o número de objetos em authorList, k é o número médio de autores por objeto e n é o número total de autores em todos os objetos.
        const authorCounts = {};

        //Para cada autor dentro das listas, é feita uma de cada um deles.
        authorList.forEach((obj) => {
            for (let key in obj) {
                //Separa os autores pela vírgula na string
                const authorNames = obj[key].split(",");
                //Para cada author na lista...
                authorNames.forEach((author) => {
                    //Remove os espações no começo e no final...
                    const trimmedAuthor = author.trim();
                    //Se for encontrado o autor nessa lista anteriormente...
                    if (authorCounts[trimmedAuthor]) {
                        //Soma mais um no número de contagem dos autores.
                        authorCounts[trimmedAuthor]++;
                    } else {
                        //Se for a primeira ou a última contagem do autor, adiciona apenas um.
                        authorCounts[trimmedAuthor] = 1;
                    }
                });
            }
        });

        return authorCounts;
    }
    
    addCountToAuthorString(authorList) { //O(m⋅(k+n)+m⋅k′), onde m é o número de objetos em authorList, k é o número médio de autores por objeto, n é o número total de autores em todos os objetos, e k′ é o número médio de nomes de autores por objeto.
        // Obtenha a contagem de autores usando a função countAuthors
        const counts = this.countAuthors(authorList);
    
        // Mapeie a lista de autores para atualizar as contagens
        const updatedAuthorsList = authorList.map((obj) => {
            // Crie um novo objeto para armazenar as atualizações
            const updatedObj = {};
    
            // Itere sobre as chaves do objeto
            for (let key in obj) {
                // Divida os nomes dos autores com base na vírgula na string
                const authorNames = obj[key].split(",");
                
                // Mapeie os nomes dos autores para adicionar contagens
                const updatedNames = authorNames.map((author) => {
                    // Remova espaços no início e no final do nome do autor
                    const trimmedAuthor = author.trim();
                    
                    // Obtenha a contagem correspondente ao autor
                    const count = counts[trimmedAuthor];
                    
                    // Crie uma string formatada com o nome do autor e a contagem
                    return `${trimmedAuthor}, ${count || 0}`;
                });
    
                // Atualize o objeto com os nomes dos autores modificados
                updatedObj[key] = updatedNames.join(",");
            }
    
            // Retorne o objeto atualizado
            return updatedObj;
        });
    
        // Retorne a lista de autores atualizada
        return updatedAuthorsList;
    }
}

export default BLLCoAuthorShip;