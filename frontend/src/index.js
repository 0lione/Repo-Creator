import ReactDOM from 'react-dom';
import logo from './GitHub-Mark.png';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import CreateRepo from "./CreateRepo";
import AddFiles from "./AddFiles";
import Contributors from "./AddContributors";
import Token from "./Token";
import Success from "./success";
import { useState } from 'react';

function Header() {
   return (
       <div className={"Header"}>
           <nav className="Nav">
                <a href="https://github.com/0lione" target={"_blank"}>
                   <img src={logo} className="Nav-logo" alt="logo" width={90}/>
                </a>
                    <h1 className="Header-title">Create your GitHub Repository</h1>
           </nav>
      </div>
   );
}




function App() {
    const [showCreateRepo, setShowCreateRepo] = useState(false);
    const [showAddFiles, setShowAddFiles] = useState(false);
    const [showAddContributors, setShowAddContributors] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);




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
            {!showSuccess && <Header/>}
            {!showSuccess && !showCreateRepo && <Token setShowCreateRepo={setShowCreateRepo} change={handleChange} request={handleSubmit}/>}
            {!showSuccess && (showCreateRepo && !showAddFiles) && <CreateRepo setShowAddFiles={setShowAddFiles} change={handleChange} request={handleSubmit}/>}
            {!showSuccess && (!showAddContributors && showAddFiles) && <AddFiles setShowAddContributors={setShowAddContributors} change={handleChange} request={handleSubmit}/>}
            {!showSuccess && showAddContributors && <Contributors setShowSuccess={setShowSuccess}/>}
            {showSuccess && <Success setShowCreateRepo={setShowCreateRepo} setShowAddFiles={setShowAddFiles}
                                     setShowAddContributors={setShowAddContributors} setShowSuccess={setShowSuccess}/>}

        </div>
    );
}




ReactDOM.render(<App/>,document.getElementById('root'));
