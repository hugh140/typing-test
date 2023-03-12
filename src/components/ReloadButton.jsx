function ReloadButton() 
{
    function reload() {
        location.reload()
    }

    return (
      <button 
        className="reload-button"
        onClick={reload}
      >
        Reiniciar
      </button>
    )
}
export default ReloadButton