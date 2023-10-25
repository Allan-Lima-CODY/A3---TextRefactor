const stopwords = require('stopwords');
const nlp = require('compromise');

class BLLTextRefactor {
  getText(text) {
    return text;
  }

  getTitle(text) {
    const lines = text.split('\n');

    return lines[0];
  }

  getPredefinedKeywords(text) {
    const lines = text.split('\n');

    return lines[2];
  }

  getPhrases(text) {
    const phrases = text.split(/[\.;]/);

    return phrases;
  }

  tokenizeText(phrases) {
    const phrasesTokenized = [];

    for (let i = 0; i < phrases.length; i++) {
      const item = [];
      item.push(phrases[i].toLowerCase().split(/\W+/).filter(word => word.length > 0));

      tokenized.push(item);
    }

    return tokenizedPhrases;
  }

  removeStopWords(tokenizedPhrases) {
    const withoutStopwords = [];

    for (let i = 0; i < tokenizedPhrases.length; i++) {
      const phrase = tokenizedPhrases[i];
      const filteredWords = phrase.filter(word => !stopwords.includes(word));

      withoutStopwords.push(filteredWords);
    }

    return withoutStopwords;
  }

  lemmatizeTokens(tokenMatrix) {
    const lemmatizedMatrix = [];

    for (let i = 0; i < tokenMatrix.length; i++) {
      const tokenList = tokenMatrix[i];
      const text = tokenList.join(' ');
      const doc = nlp(text);

      doc.normalize();
      const lemmatizedTokens = doc.out('array');

      lemmatizedMatrix.push(lemmatizedTokens);
    }

    return lemmatizedMatrix;
  }

  extractKeywordsFromMatrix(lemmatizedMatrix) {
    const wordCount = {};

    for (let i = 0; i < lemmatizedMatrix.length; i++) {
      const tokenList = lemmatizedMatrix[i];
      const listObject = {};

      tokenList.forEach(token => {
        if (listObject[token]) {
          listObject[token]++;
        } else {
          listObject[token] = 1;
        }
      });

      wordCount[`List${i + 1}`] = listObject;
    }

    return wordCount;
  }

  oftenWords(wordCount) {
    const sortedKeywords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);

    return sortedKeywords;
  }
}

export default BLLTextRefactor;
