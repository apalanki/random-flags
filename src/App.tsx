import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import codes from "./CountryCodes.json"

interface Code {
    name: string,
    dial_code: string,
    code: string
}

const FLAG_ENDPOINT = "https://countryflagsapi.com/SVG/";

const shuffledCodes = codes
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)


function App() {
    const [number, setNumber] = useState<number>(0);
    const [showHint, setShowHint] = useState<boolean>(false);

    const selectedState = shuffledCodes[number];

    useEffect(() => {
        setShowHint(false);
    }, [number])

    const handleKeyDown = useCallback((e: any): void => {
        if (e.code === "ArrowRight") {
            setNumber((currentNumber) => {
                const nextNumber = currentNumber + 1;
                return nextNumber < shuffledCodes.length ? nextNumber : currentNumber;
            });
            e.preventDefault();
        } else if (e.code === "ArrowLeft") {
            setNumber((currentNumber) => {
                const previousNumber = currentNumber - 1;
                return previousNumber >= 0 ? previousNumber : currentNumber;
            });
            e.preventDefault();
        } else if (e.code === "ArrowUp") {
            setShowHint(false);
            e.preventDefault();
        } else if (e.code === "ArrowDown") {
            setShowHint(true);
            e.preventDefault();
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);

    return (
        <div className="App" onKeyDown={handleKeyDown}>
            <header className="App-header">
                {showHint ? <div>
                    <p>{selectedState.name}</p>
                </div> : null}
                <img src={`${FLAG_ENDPOINT}${selectedState.code}`} className="App-logo" alt="logo"/>
                {showHint ? <div>
                    <p>{selectedState.code} ( {number + 1} of {codes.length} )</p>
                </div> : null}
            </header>
        </div>
    );
}

export default App;
