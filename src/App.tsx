import React from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import PeriodicElements from './PeriodicElements';
import Flags from './Flags';
import ResponsiveAppBar from "./ResponsiveAppBar";

function App() {
    return (
        <div className="App">
            <ResponsiveAppBar/>
            <Routes>
                <Route path="elements" element={<PeriodicElements/>}/>
                <Route path="flags" element={<Flags/>}/>
            </Routes>
            <Link to="/elements">Elements</Link>
            <Link to="/flags">Flags</Link>
        </div>
    );
}

export default App;
