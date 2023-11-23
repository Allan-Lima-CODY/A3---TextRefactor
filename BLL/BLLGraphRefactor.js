class BLLGraphRefactor {
  extractWordFrequency(objText) {
    const newList = [];

    objText.forEach((obj) => {
      const { wordFrequency } = obj;
      const newObject = { wordFrequency };

      newList.push(newObject);
    });

    return newList;
  }

  removeNumbers(wordFrequency) {
    const newList = [];

    wordFrequency.forEach((originalObj) => {
      const modifyedObj = { ...originalObj };

      for (const listKey in modifyedObj.wordFrequency) {
        if (modifyedObj.wordFrequency.hasOwnProperty(listKey)) {
          const list = modifyedObj.wordFrequency[listKey];
          const nanWord = Object.keys(list).filter((key) => isNaN(key));

          Object.keys(list).forEach((key) => {
            if (!nanWord.includes(key)) {
              delete list[key];
            }
          });
        }
      }

      newList.push(modifyedObj);
    });

    return newList;
  }

  removeLittleWords(data) {
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

  onlyAllWords(data) {
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

  removeEmptyLists(data) {
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

  createGraph(modifyedWordFrequency) {
    const allWordsList = [];
  
    modifyedWordFrequency.forEach((wordFrequency, index) => {
      const allWordsObject = {};
      const allWordsKey = `VertexAndEdgesOfText${index + 1}`;
  
      allWordsObject[allWordsKey] = wordFrequency.wordFrequency.AllWords;
      allWordsList.push(allWordsObject);
    });
  
    return allWordsList;
  }
}

export default BLLGraphRefactor;