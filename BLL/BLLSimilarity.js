class BLLSimilarity{
    calculateSum(allWords1, allWords2) {
        const allWords = new Set([...Object.keys(allWords1), ...Object.keys(allWords2)]);
        let sum = 0;
    
        allWords.forEach(word => {
          if (allWords1.hasOwnProperty(word) && allWords2.hasOwnProperty(word)) {
            sum += allWords1[word] + allWords2[word];
          }
        });
    
        return sum;
      }
    
      relationAllWords(allWordsList) {
        const resultRelation = [];
    
        for (let i = 0; i < allWordsList.length; i++) {
          for (let j = i + 1; j < allWordsList.length; j++) {
            const allWords1 = allWordsList[i];
            const allWords2 = allWordsList[j];
            const keyAllWords1 = Object.keys(allWords1)[0];
            const keyAllWords2 = Object.keys(allWords2)[0];
    
            const sum = this.calculateSum(allWords1[keyAllWords1], allWords2[keyAllWords2]);
    
            resultRelation.push({
              Vertex1: keyAllWords1,
              Vertex2: keyAllWords2,
              Similarity: sum
            });
          }
        }
    
        return resultRelation;
      }
}

export default BLLSimilarity;