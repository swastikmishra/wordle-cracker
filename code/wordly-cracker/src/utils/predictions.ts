class Predictions {
  words: Array<string> = [];

  constructor() {
    fetch("/5words.json")
      .then((res) => res.json())
      .then((res) => {
        this.words = res;
      });
  }

  predict = (
    fixedArray: Array<string>,
    guessArray: Array<string>
  ): Array<string> => {
    let predictionWords: Array<string> = this.words;
    fixedArray = fixedArray.map((letter: string) => {
      return letter.toLowerCase();
    });
    guessArray = guessArray.map((letter: string) => {
      return letter.toLowerCase();
    });

    for (let i = 0; i < fixedArray.length; i++) {
      if (fixedArray[i] != "") {
        predictionWords = predictionWords.filter((word: string) => {
          if (word.substring(i, i + 1) == fixedArray[i]) return true;
          else return false;
        });
      }
    }

    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] != "") {
        predictionWords = predictionWords.filter((word: string) => {
          return word.indexOf(guessArray[i]) == -1 ? false : true;
        });
      }
    }

    return predictionWords.length > 1000 ? [] : predictionWords;
  };
}

export default Predictions;
