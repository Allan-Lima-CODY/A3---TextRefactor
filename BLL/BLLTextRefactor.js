import stopword from 'stopword';
const language = 'pt';
import nlp from 'compromise';
import stopwords from '../Constants/stopwords.js'

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

  tokenizePhrases(phrases) {
    const phrasesTokenized = [];

    for (let i = 0; i < phrases.length; i++) {
      const matches = phrases[i].toLowerCase().match(/[a-záàâãéèêíïóôõöúçñ\w]+/g);
      if (matches) {
        phrasesTokenized.push(matches.filter(word => word.length > 0));
      }
    }

    return phrasesTokenized;
  }

  removeStopWords(tokenizedPhrases) {
    const withoutStopwords = [];

    for (let i = 0; i < tokenizedPhrases.length; i++) {
      const phrase = tokenizedPhrases[i];
      const cleanedPhrase = [];
  
      for (let j = 0; j < phrase.length; j++) {
        const word = phrase[j];
  
        if (!stopwords.includes(word)) {
          cleanedPhrase.push(word);
        }
      }
  
      withoutStopwords.push(cleanedPhrase);
    }

    return withoutStopwords;
  }

  lemmatizeTokens(withoutStopwords) {
    const lemmatizedPhrases = [];
  
    for (let i = 0; i < withoutStopwords.length; i++) {
      const phrase = withoutStopwords[i];
      const lemmatizedPhrase = [];
  
      for (let j = 0; j < phrase.length; j++) {
        const word = phrase[j];
  
        const doc = nlp(word).normalize(false);
        const lemmatizedWord = doc.out();
  
        lemmatizedPhrase.push(lemmatizedWord);
      }
  
      lemmatizedPhrases.push(lemmatizedPhrase);
    }
  
    return lemmatizedPhrases;
  }

  extractKeywordsOften(lemmatized) {
    const wordCount = {};

    for (let i = 0; i < lemmatized.length; i++) {
      const tokenList = lemmatized[i];
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

  sortWords(wordCount) {
    const sortedWordFrequency = {};
    
    for (const listKey in wordCount) {
      if (wordCount.hasOwnProperty(listKey)) {
        const list = wordCount[listKey];
        const sortedList = {};
  
        // Converter o objeto em uma matriz de pares (palavra, contagem)
        const wordArray = Object.entries(list);
  
        // Ordenar a matriz com base na contagem (valor) em ordem decrescente
        wordArray.sort((a, b) => b[1] - a[1]);
  
        // Converter a matriz classificada de volta para um objeto
        wordArray.forEach(([word, count]) => {
          sortedList[word] = count;
        });
  
        sortedWordFrequency[listKey] = sortedList;
      }
    }
  
    return sortedWordFrequency;
  }
}

export default BLLTextRefactor;
