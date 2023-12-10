class BLLGraphRefactor {
  extractWordFrequency(objText) { //O(m), onde m é o número de objetos em objText
    // Crie uma nova lista para armazenar os objetos modificados
    const newList = [];

    // Itere sobre os objetos em objText
    objText.forEach((obj) => {
      // Extraia a propriedade wordFrequency do objeto
      const { wordFrequency } = obj;

      // Crie um novo objeto com a propriedade wordFrequency
      const newObject = { wordFrequency };

      // Adicione o novo objeto à lista
      newList.push(newObject);
    });

    // Retorne a lista modificada
    return newList;
  }

  removeNumbers(wordFrequency) { //O(m⋅n⋅(k+k′)), onde m é o número de objetos em wordFrequency, n é o número médio de chaves no objeto wordFrequency, k é o número médio de chaves em cada lista associada a uma chave, e k′ é o número de chaves na lista de chaves que não são números (NaN).
    // Crie uma nova lista para armazenar os objetos modificados
    const newList = [];

    // Itere sobre os objetos em wordFrequency
    wordFrequency.forEach((originalObj) => {
      // Crie uma cópia do objeto original
      const modifiedObj = { ...originalObj };

      // Itere sobre as chaves do objeto wordFrequency dentro do objeto modificado
      for (const listKey in modifiedObj.wordFrequency) {
        if (modifiedObj.wordFrequency.hasOwnProperty(listKey)) {
          // Obtenha a lista associada à chave
          const list = modifiedObj.wordFrequency[listKey];

          // Encontre as chaves que não são números (NaN)
          const nanWords = Object.keys(list).filter((key) => isNaN(key));

          // Itere sobre as chaves da lista e remova aquelas que não são números
          Object.keys(list).forEach((key) => {
            if (!nanWords.includes(key)) {
              delete list[key];
            }
          });
        }
      }

      // Adicione o objeto modificado à nova lista
      newList.push(modifiedObj);
    });

    // Retorne a lista modificada
    return newList;
  }

  removeLittleWords(data) { //O(m⋅n⋅k), onde m é o número de objetos em data, n é o número médio de chaves no objeto wordFrequency, e k é o número médio de chaves em cada lista associada a uma chave.
    // Criar uma nova list para armazenar os objetos modificados
    const newList = [];

    // Iterar sobre cada objeto na list
    data.forEach((originalObj) => {
      // Criar uma cópia do objeto original para evitar modificar os data originais
      const modifyedObj = { ...originalObj };

      // Iterar sobre cada list dentro de wordFrequency
      for (const listKey in modifyedObj.wordFrequency) {
        if (modifyedObj.wordFrequency.hasOwnProperty(listKey)) {
          const list = modifyedObj.wordFrequency[listKey];

          // Filtrar apenas as keys que têm mais de dois caracteres
          const keysWithMoreThanTwoChars = Object.keys(list).filter((key) => key.length > 2);

          // Remover as keys que têm um ou dois caracteres
          Object.keys(list).forEach((key) => {
            if (!keysWithMoreThanTwoChars.includes(key)) {
              delete list[key];
            }
          });
        }
      }

      // Adicionar o objeto modificado à nova list
      newList.push(modifyedObj);
    });

    // Retornar a nova list de objetos modificados
    return newList;
  }

  onlyAllWords(data) { //O(m⋅n⋅k+m⋅plogp), onde m é o número de objetos em data, n é o número médio de chaves no objeto wordFrequency, k é o número médio de palavras em cada lista associada a uma chave, e p é o número total de palavras distintas em "AllWords"
    // Criar uma nova list para armazenar os objetos modificados
    const newList = [];

    // Iterar sobre cada objeto na list
    data.forEach((originalObj) => {
      // Criar uma cópia do objeto original para evitar modificar os data originais
      const modifyedObj = { ...originalObj };

      // Inicializar o objeto "AllWords" para armazenar todas as words e suas contagens
      const allWords = {};

      // Iterar sobre cada list dentro de wordFrequency
      for (const listKey in modifyedObj.wordFrequency) {
        if (modifyedObj.wordFrequency.hasOwnProperty(listKey)) {
          const list = modifyedObj.wordFrequency[listKey];

          // Iterar sobre cada word na list
          for (const word in list) {
            if (list.hasOwnProperty(word)) {
              // Adicionar a word e sua contagem ao objeto "AllWords"
              if (allWords[word]) {
                allWords[word] += list[word];
              } else {
                allWords[word] = list[word];
              }
            }
          }
        }
      }

      // Adicionar o objeto "AllWords" ao objeto modificado
      modifyedObj.wordFrequency.AllWords = allWords;

      // Ordenar "AllWords" em ordem decrescente com base nas contagens
      modifyedObj.wordFrequency.AllWords = Object.fromEntries(
        Object.entries(allWords).sort(([, a], [, b]) => b - a)
      );

      // Adicionar o objeto modificado à nova list
      newList.push(modifyedObj);
    });

    // Retornar a nova list de objetos modificados
    return newList;
  }

  removeEmptyLists(data) { //O(m⋅n), onde m é o número de objetos em data e n é o número médio de chaves no objeto wordFrequency para cada objeto.
    // Criar uma nova list para armazenar os objetos modificados
    const newList = [];

    // Iterar sobre cada objeto na list
    data.forEach((originalObj) => {
      // Criar uma cópia do objeto original para evitar modificar os data originais
      const modifyedObj = { ...originalObj };

      // Filtrar as lists que não estão vazias
      modifyedObj.wordFrequency = Object.fromEntries(
        Object.entries(modifyedObj.wordFrequency).filter(
          ([listKey, list]) => Object.keys(list).length > 0
        )
      );

      // Adicionar o objeto modificado à nova list
      newList.push(modifyedObj);
    });

    // Retornar a nova list de objetos modificados
    return newList;
  }

  createGraph(modifiedWordFrequency) { //O(m⋅n), onde m é o número de objetos em modifiedWordFrequency e n é o número médio de palavras em wordFrequency.wordFrequency.AllWords para cada objeto.
    // Crie uma lista para armazenar objetos contendo informações sobre todas as palavras
    const allWordsList = [];

    // Itere sobre os objetos em modifiedWordFrequency
    modifiedWordFrequency.forEach((wordFrequency, index) => {
      // Crie um novo objeto para armazenar as palavras
      const allWordsObject = {};

      // Gere uma chave única para o objeto com base no índice
      const allWordsKey = `VertexAndEdgesOfText${index + 1}`;

      // Associe a chave ao conjunto de palavras do objeto wordFrequency
      allWordsObject[allWordsKey] = wordFrequency.wordFrequency.AllWords;

      // Adicione o objeto à lista
      allWordsList.push(allWordsObject);
    });

    // Retorne a lista contendo as informações sobre todas as palavras
    return allWordsList;
  }
}

export default BLLGraphRefactor;