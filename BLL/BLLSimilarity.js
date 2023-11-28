class BLLSimilarity {
  calculateSum(allWords1, allWords2) {
    // Crie um conjunto contendo todas as palavras únicas de ambas as listas
    const allWords = new Set([...Object.keys(allWords1), ...Object.keys(allWords2)]);

    // Inicialize a variável de soma
    let sum = 0;

    // Itere sobre as palavras no conjunto
    allWords.forEach(word => {
      // Verifique se a palavra está presente em ambas as listas
      if (allWords1.hasOwnProperty(word) && allWords2.hasOwnProperty(word)) {
        // Adicione a soma do valor da palavra nas duas listas à variável de soma
        sum += allWords1[word] + allWords2[word];
      }
    });

    // Retorne a soma calculada
    return sum;
  }

  relationAllWords(allWordsList) {
    // Crie uma lista para armazenar as relações entre todos os conjuntos de palavras
    const resultRelation = [];

    // Itere sobre os conjuntos de palavras na lista
    for (let i = 0; i < allWordsList.length; i++) {
      // Compare com os conjuntos subsequentes na lista
      for (let j = i + 1; j < allWordsList.length; j++) {
        // Obtenha os conjuntos de palavras e suas chaves
        const allWords1 = allWordsList[i];
        const allWords2 = allWordsList[j];
        const keyAllWords1 = Object.keys(allWords1)[0];
        const keyAllWords2 = Object.keys(allWords2)[0];

        // Calcule a similaridade entre os conjuntos usando a função calculateSum
        const sum = this.calculateSum(allWords1[keyAllWords1], allWords2[keyAllWords2]);

        // Adicione a relação à lista de resultados
        resultRelation.push({
          Vertex1: keyAllWords1,
          Vertex2: keyAllWords2,
          Similarity: sum
        });
      }
    }

    // Retorne a lista de relações calculadas
    return resultRelation;
  }

}

export default BLLSimilarity;