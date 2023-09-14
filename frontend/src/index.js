import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import logo from './GitHub-Mark.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import CreateRepo from "./CreateRepo";
import AddFiles from "./AddFiles";
import Contributors from "./AddContributors";
import { useState } from 'react';

function Header() {
   return (
       <div className={"Header"}>
           <nav className="Nav">
                   <img src={logo} className="Nav-logo" alt="logo" width={90} />
                    <h1 className="Header-title">Create your GitHub Repository</h1>
           </nav>
      </div>
   );
}




function App() {
    const [showAddFiles, setShowAddFiles] = useState(false);
    const [showAddContributors, setShowAddContributors] = useState(false);




    const handleChange = (e,setFormValues) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e,uri,formValues,setShowOtherComponent) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/${uri}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result['status'] === 'success') {
                    setShowOtherComponent(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className="App">
            <Header/>
            {!showAddFiles && <CreateRepo setShowAddFiles={setShowAddFiles} change={handleChange} request={handleSubmit}/>}
            {(!showAddContributors && showAddFiles) && <AddFiles setShowAddContributors={setShowAddContributors} change={handleChange} request={handleSubmit}/>}
            {showAddContributors && <Contributors/>}
        </div>
    );
}




ReactDOM.render(<App/>,document.getElementById('root'));
