const CountryForm = ({ inputValue, inputChangeHandler }) => {
  return (
    <form>
      <div>
        find countries:{" "}
        <input value={inputValue} onChange={inputChangeHandler} />
      </div>
    </form>
  )
}

export default CountryForm