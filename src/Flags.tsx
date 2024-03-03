import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import codes from "./CountryCodes.json"
import {useSwipeable} from "react-swipeable";

interface Code {
    name: string,
    code: string
}

const FLAG_ENDPOINT = "https://flagcdn.com";
/**
 * Available Sizes: 20, 40, 80, 160, 320, 640, 1280, 2560
 */
const SIZE = 320;

const shuffledCodes: Code[] = (codes as Code[])
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)

function Flags() {
    const [number, setNumber] = useState<number>(0);
    const [showHint, setShowHint] = useState<boolean>(false);
    const selectedState = shuffledCodes[number];
    const handlers = useSwipeable({
        onSwipedLeft: () => setNumber((currentNumber) => {
            const previousNumber = currentNumber - 1;
            return previousNumber >= 0 ? previousNumber : currentNumber;
        }),
        onSwipedRight: () => setNumber((currentNumber) => {
            const nextNumber = currentNumber + 1;
            return nextNumber < shuffledCodes.length ? nextNumber : currentNumber;
        }),
        onSwipedUp: () =>  setShowHint(currentHint => !currentHint),
        onSwipedDown: () =>  setShowHint(currentHint => !currentHint)
    });

    const myRef = React.useRef();

    useEffect(() => {
        setShowHint(false);
    }, [number])

    const refPassThrough = (el: any) => {
        // call useSwipeable ref prop with el
        handlers.ref(el);

        // set myRef el so you can access it yourself
        myRef.current = el;
    }

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
        <div className="App" onKeyDown={handleKeyDown} ref={refPassThrough}>
            <header className="App-header">
                {showHint ? <p>{selectedState.name}</p> : null}
                <img src={`${FLAG_ENDPOINT}/w${SIZE}/${selectedState.code.toLowerCase()}.png`}
                     srcSet={`${FLAG_ENDPOINT}/w${2*SIZE}/${selectedState.code.toLowerCase()}.png 2x`}
                     width={SIZE}
                     className="App-logo" alt={selectedState.name}/>
                {showHint ? <p>{selectedState.code} ( {number + 1} of {codes.length} )</p> : null}
            </header>
        </div>
    );
}

export default Flags;
