import { useState, useEffect } from "react"

function App() {

  /* function validate (input1){
    let errors = {};
    let regExpNum = /^\d+$/;
  } */
  
  const [input1, setInput1] = useState({
    n: 0,
    c: 0,
    m: 0
  })
  const [messages, setMessages] = useState([])
  const [num, setNum] = useState(0)

  useEffect(() => {

    fetch("http://localhost:3001/")
      .then(res => res.json())
      .then(res => {
        console.log(res, "hola")
        setMessages(res)
      })
      .catch(err => console.error(err))
  }, [])

  function handleInputChange(e) {
    e.preventDefault();
    
    setInput1({
      ...input1,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    
    e.preventDefault()
    console.log(input1)

    fetch("http://localhost:3001/chocolateFeast", {
      method: "POST",
      body: JSON.stringify(input1),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result, "result")
        setNum(result)
        //setMessages(result)
      })

    alert("mensaje enviado correctamente")

    setInput1({
      n: 0,
      c: 0,
      m: 0
    })
    e.target.reset()
  }


  return (
    <div >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>VISUAL CONTACT</h1>
          <h2>CHOCOLATE FEAST</h2>
          <label>Initial amount of money</label>
          <input type="text" name="n" placeholder="...N" onChange={(e) => handleInputChange(e)}></input>
          <label>Cost of a chocolate bar</label>
          <input type="text" name="c" placeholder="...C" onChange={(e) => handleInputChange(e)}></input>
          <label>Number of wrappers he can turn in for a free bar </label>
          <input type="text" name="m" placeholder="...M" onChange={(e) => handleInputChange(e)}></input>
          <button type="submit">Send</button>
        </div>
        <div>
          <h2>Number of chocolates that you can eat after taking full advantage of the promotion is:</h2>
          {
            num < 0 ? <h1> You need more money</h1> :
            <h1>{num}</h1>
          }
        </div>
      </form>

    </div>
  );
}

export default App;
