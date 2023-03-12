import { useEffect, useState } from "react"

const body = document.querySelector('body')

function ResultsResetTest() {
    const typing = document.querySelector('#typing-test') 
    const results = document.querySelector('#results') 

    typing.classList.add('hide')
    typing.classList.remove('show')
    results.classList.add('show')
    results.classList.remove('hide')
}

function Timer({init}) {
    const [minutes, setMinutes] = useState(60)
    let [minutesRender, setMinutesRender] = useState('Fast Typing Test')

    if (minutes === 0) ResultsResetTest()

    useEffect(() => {
        if (minutes && init) {
            setMinutesRender(minutes >= 60 ? '1:00' :
                (minutes < 10 ? '0:0' + minutes : '0:' + minutes))

            body.classList.add('init-body')
            const timer = setInterval(() => 
                setMinutes(minutes - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [minutes, init])

    return (
        <div className="timer">
            <h1>{minutesRender}</h1>
        </div>
    )
}
export default Timer