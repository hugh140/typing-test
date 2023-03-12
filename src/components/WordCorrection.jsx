import { useEffect, useState } from "react"

function WordCorrection({word = '', inValue})
{
    const className = Array(word.length).fill(null)
    const wordSplit = word.split('')

    function changeClassName(index) {
        switch (className[index]) {
            case true: return 'correct-letter'
            case false: return 'wrong-letter'
        }
    }

    return (
        <h1>
        {wordSplit.map((letter, index) => {
            className[index] = letter === inValue[index] ? true : false
            return (
                <span 
                    key={index}
                    className={changeClassName(index)}
                >
                    {letter}
                </span>
            )
        })}
        </h1>
    )
}
export default WordCorrection