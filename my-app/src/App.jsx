import './App.css';
import React, { useEffect, useState } from "react"
import Table from "./Table.jsx"

function App() {
    return ( <div>
        <Table/>
    </div>);
}

export default App;
//<p>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading up...'}</p>