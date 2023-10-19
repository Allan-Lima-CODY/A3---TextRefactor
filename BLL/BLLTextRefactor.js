const stopwords = require('stopwords');
const nlp = require('compromise');

class BLLTextRefactor {
  getText(text){
    //Retorna o texto que a API trás de requisição.
    return text;
  }

  tokenizeText(text) {
    //Deixa todas as palavras do texto com letras minúsculas, retira com Regex tudo que não for palavras, como espaços, acentos, pontuação e coloca todas as palvras dentro de uma lista, onde todas as palavras tem que ter um número maior que 0 de caracteres.
    const tokenized = text.toLowerCase().split(/\W+/).filter(word => word.length > 0);

    return tokenized;
  }

  removeStopWords(tokens){
    //Recebe as palavras do texto que foi tokenizado e todas as que forem diferentes das stopwords que foi importada no começo do arquivo, é adicionada a uma nova lista. E no caso, essa lista pe retornada.
    return tokens.filter(token => !stopwords.includes(token));
  }

  lemmatizeTokens(tokens) {
    //Pega a lista de palavras com as stopwords removidas e cria uma string com todas as palavras e um espaço entre elas.
    const text = tokens.join(' ');
    
    //Adiciona a string criada em um documento NLP, que é usado para fazer vários tipos de operações relacionadas a linguagem natural.
    const doc = nlp(text);
    
    //Aqui é onde ocorre a lematização, tranformando palavras como amoroso em amor e corrigindo erros tipográficos.
    doc.normalize();
    
    //Aqui, o NLP é transformado em um array e é devolvido com a lista de palavras lematizadas.
    return doc.out('array');
  }

  extractKeywords(tokens) {
    //Será o objeto responsável por contar as ocorrências de palavras do texto.
    const wordCount = {};

    //Para cada ocorrência de palavra dentro do token, ela é adiciona ao wordCount com a quantidade de ocorrências que a mesma teve dentro da lista de tokens.
    tokens.forEach(token => {
      if (wordCount[token]) {
        wordCount[token]++;
      } else {
        wordCount[token] = 1;
      }
    });

    return wordCount;
  }

  oftenWords(wordCount){
    //Ordena o wordCount em ordem descrescente, onde as palavras que tem um número maior de ocorrências ficarão no topo da lista.
    const sortedKeywords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);

    return sortedKeywords;
  }

  identifyTheme(sortedKeywords){
    //O tema será a primeira palavra que a lista tiver, pois a mesma será a que tem o maior número de ocorrências.
    return sortedKeywords[0];
  }
}

export default BLLTextRefactor;
