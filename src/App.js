import logo from './logo.svg';
import './App.css';
import {LIST_TYPE, SparseMatrixService} from "./services/sparseMatrixService";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        new SparseMatrixService().generateListByStyle(LIST_TYPE.DOUBLY_LINKED_LIST);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
