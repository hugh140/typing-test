function WordHighlight({text, className, wordIndex})
{
  function changeClassName(index) {
    if (index === wordIndex) return 'yellow-text'
    return className[index] ? 'green-text' : null 
  }

  return (
    <p>
    {text.map((word, index) => (
      <span 
        key={index} 
        className={changeClassName(index)}
      > 
      {word} </span>
    ))}
    </p>
  )
}
export default WordHighlight
