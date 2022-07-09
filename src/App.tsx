import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import codes from "./CountryCodes.json"

interface Code {
    name: string,
    code: string
}

const FLAG_ENDPOINT = "https://countryflagsapi.com/SVG";

const shuffledCodes: Code[] = (codes as Code[])
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
        } else if (["ArrowUp", "ArrowDown"].includes(e.code)) {
            setShowHint(currentHint => !currentHint);
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
                {showHint ?<p>{selectedState.name}</p>: null}
                <img src={`${FLAG_ENDPOINT}/${selectedState.code}`} className="App-logo" alt="country flag"/>
                {showHint ? <p>{selectedState.code} ( {number + 1} of {codes.length} )</p> : null}
            </header>
        </div>
    );
}

export default App;
