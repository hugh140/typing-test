import { useEffect, useState } from "react";
import WordHighlight from "./components/WordHighlight";
import WordCorrection from "./components/WordCorrection";
import Timer from "./components/Timer";
import ReloadButton from "./components/ReloadButton";

import tale from "./tale/pinocho";

let wordsCounter = 0;
let lettersCounter = 0;
let wrongLettersCounter = 0;
let writingPrecision = 0;

let keyDetect = "";
const body = document.querySelector("body");
body.addEventListener("keydown", (e) => {
  keyDetect = e.key;
});

function App() {
  const [text, setText] = useState([]);
  const [className, setClassName] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [initTimer, setInitTimer] = useState(false);

  useEffect(() => {
     fetch("http://metaphorpsum.com/paragraphs/1/20")
       .then((response) => response.text())
       .then((data) => {
         const splitData = data.split(" ");
         setText(splitData);
         setClassName(Array(splitData.length).fill(false));
       });

    const splitData = tale.split(" ");
    setText(splitData);
    setClassName(Array(splitData.length).fill(false));
  }, []);

  function countWrongLetters(e, lettersWord) {
    const word = text[0].split("");
    const input = lettersWord.split("");
    const inputLength = input.length - 1;

    if (keyDetect !== "Backspace" && word[inputLength] !== input[inputLength]) {
      wrongLettersCounter++;
    }
    if (lettersCounter !== 0)
      writingPrecision =
        ((lettersCounter - wrongLettersCounter) * 100) / lettersCounter;
    else writingPrecision = 100;
  }

  function detectFinalizeWord(e, lettersWord) {
    if (lettersWord === text[0] + " ") {
      const correctWords = [...className];
      correctWords[0] = true;
      setClassName(correctWords);
      setInputValue("");

      const newText = [...text];
      newText.splice(0, 1);
      setText(newText);

      e.target.value = "";
      wordsCounter++;
      wrongLettersCounter--;
      lettersCounter += text[0].length;
    }
  }

  function getWord(e) {
    const lettersWord = e.target.value;
    setInputValue(lettersWord);
    setInitTimer(true);

    detectFinalizeWord(e, lettersWord);
    countWrongLetters(e, lettersWord);
  }

  return (
    <>
      <section className="show" id="typing-test">
        <Timer init={initTimer} />

        <div className="text">
          <div className="typing-word">
            <WordCorrection word={text[0]} inValue={inputValue.split("")} />
            <input onChange={getWord} type="text" />
          </div>

          <WordHighlight
            text={text.slice(1, text.length)}
            className={className}
            wordIndex={0}
          />
        </div>
      </section>

      <section className="hide" id="results">
        <h1>Resultados</h1>
        <p>Palabras escritas por minuto: </p>
        <span className="stat-result">{wordsCounter}</span>
        <p>Precisión al escribir: </p>
        <span className="stat-result">{writingPrecision.toFixed(2)}%</span>
        <br />
        <ReloadButton />
      </section>
    </>
  );
}
export default App;
