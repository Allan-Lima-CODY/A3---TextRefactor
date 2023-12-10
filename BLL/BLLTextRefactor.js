import stopwords from '../Constants/stopwords.js'

class BLLTextRefactor {
  // Retorna o texto original sem modificações
  getText(text) { //O(n), onde n é o tamanho do text
    return text;
  }

  // Obtém o título do texto a partir da primeira linha
  getTitle(text) { //O(n), onde n é o comprimento do texto de entrada
    const lines = text.split('\n');
    return lines[0];
  }

  // Obtém as palavras-chave predefinidas a partir da terceira linha
  getPredefinedKeywords(text) { //O(n), onde n é o comprimento do texto de entrada.
    const lines = text.split('\n');
    return lines[2];
  }

  // Obtém as frases do texto divididas com base em pontos e vírgulas
  getPhrases(text) { //O(n), onde n é o comprimento do texto de entrada.
    const phrases = text.split(/[\.;]/);
    return phrases;
  }

  // Tokeniza as frases, convertendo para minúsculas e removendo caracteres não alfabéticos
  tokenizePhrases(phrases) { //O(m⋅n), onde m é o número de frases e n é o comprimento médio de uma frase.
    // Cria uma lista para armazenar as frases tokenizadas
    const phrasesTokenized = [];

    // Itera sobre as frases fornecidas
    for (let i = 0; i < phrases.length; i++) {
      // Converte a frase para minúsculas e encontra correspondências de palavras alfabéticas
      const matches = phrases[i].toLowerCase().match(/[a-záàâãéèêíïóôõöúçñ\w]+/g);

      // Verifica se há correspondências e as adiciona à lista de frases tokenizadas
      if (matches) {
        phrasesTokenized.push(matches.filter(word => word.length > 0));
      }
    }

    // Retorna a lista de frases tokenizadas
    return phrasesTokenized;
  }

  // Remove palavras de parada das frases tokenizadas
  removeStopWords(tokenizedPhrases) { //O(m⋅n⋅p⋅s), onde m é o número de frases, n é o número médio de palavras em uma frase, p é o número médio de palavras em uma frase que não são stopwords, e s é o número total de stopwords
    // Cria uma lista para armazenar as frases sem palavras de parada
    const withoutStopwords = [];

    // Itera sobre as frases tokenizadas
    for (let i = 0; i < tokenizedPhrases.length; i++) {
      // Obtém a frase atual
      const phrase = tokenizedPhrases[i];

      // Cria uma lista para armazenar a frase limpa (sem palavras de parada)
      const cleanedPhrase = [];

      // Itera sobre as palavras na frase atual
      for (let j = 0; j < phrase.length; j++) {
        // Obtém a palavra atual
        const word = phrase[j];

        // Verifica se a palavra não está na lista de palavras de parada e a adiciona à frase limpa
        if (!stopwords.includes(word)) {
          cleanedPhrase.push(word);
        }
      }

      // Adiciona a frase limpa à lista de frases sem palavras de parada
      withoutStopwords.push(cleanedPhrase);
    }

    // Retorna a lista de frases sem palavras de parada
    return withoutStopwords;
  }

  // Extrai palavras-chave frequentes das frases sem palavras de parada
  extractKeywordsOften(withoutStopwords) { //O(m⋅n⋅p), onde m é o número de frases, n é o número médio de palavras em uma frase, e p é o número médio de palavras em uma lista
    // Cria um objeto para armazenar a contagem de palavras
    const wordCount = {};

    // Itera sobre as frases sem palavras de parada
    for (let i = 0; i < withoutStopwords.length; i++) {
      // Obtém a lista de tokens da frase atual
      const tokenList = withoutStopwords[i];

      // Cria um objeto para armazenar a contagem de tokens na lista
      const listObject = {};

      // Itera sobre os tokens na lista
      tokenList.forEach(token => {
        // Atualiza a contagem para o token na lista ou inicializa com 1 se não existir
        if (listObject[token]) {
          listObject[token]++;
        } else {
          listObject[token] = 1;
        }
      });

      // Associa o objeto de contagem ao índice da lista
      wordCount[`List${i + 1}`] = listObject;
    }

    // Retorna o objeto de contagem de palavras-chave frequentes
    return wordCount;
  }

  // Extrai palavras-chave frequentes de todas as palavras em todos os textos
  extractKeywordOftenAllTexts(allWords) { //O(m⋅p+nlogn), onde m é o número total de palavras em todos os textos, p é o número médio de palavras em todos os textos, e n é o número total de entradas na matriz
    // Cria um objeto para armazenar a contagem de palavras
    const count = {};

    // Itera sobre todas as palavras em todos os textos
    allWords.forEach(word => {
      // Atualiza a contagem para a palavra ou a inicializa com 1 se não existir
      count[word] = (count[word] || 0) + 1;
    });

    // Remove chaves numéricas do objeto de contagem
    for (let key in count) {
      if (!isNaN(key)) {
        delete count[key];
      }
    }

    // Converte o objeto de contagem em uma matriz de entradas
    const countArray = Object.entries(count);

    // Ordena a matriz com base na contagem decrescente
    countArray.sort((a, b) => b[1] - a[1]);

    // Cria um novo objeto ordenado a partir da matriz ordenada
    const orderedObject = {};
    countArray.forEach(item => {
      orderedObject[item[0]] = item[1];
    });

    // Retorna o objeto de contagem ordenado
    return orderedObject;
  }

  // Ordena as palavras-chave frequentes em cada lista
  sortWords(wordCount) { //O(n + m log m), onde n é o número de chaves em wordCount e m é o número total de palavras em todas as listas
    // Cria um objeto para armazenar as listas ordenadas
    const sortedWordFrequency = {};

    // Itera sobre as chaves do objeto wordCount
    for (const listKey in wordCount) {
      if (wordCount.hasOwnProperty(listKey)) {
        // Obtém a lista de contagem associada à chave
        const list = wordCount[listKey];

        // Cria um novo objeto para armazenar a lista ordenada
        const sortedList = {};

        // Converte a lista em uma matriz de entradas e a ordena com base na contagem decrescente
        const wordArray = Object.entries(list);
        wordArray.sort((a, b) => b[1] - a[1]);

        // Itera sobre a matriz ordenada e cria um novo objeto ordenado
        wordArray.forEach(([word, count]) => {
          sortedList[word] = count;
        });

        // Associa a lista ordenada à chave original no objeto de frequência ordenada
        sortedWordFrequency[listKey] = sortedList;
      }
    }

    // Retorna o objeto de frequência de palavras ordenado
    return sortedWordFrequency;
  }
}

export default BLLTextRefactor;
