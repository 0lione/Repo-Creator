import React, { useState } from 'react';


function Token({setShowCreateRepo, change, request}) {
    const [formValues, setFormValues] = useState({
        token: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        request(e, "token", formValues,setShowCreateRepo);
    }

    const handleChange = (e) => {
        change(e,setFormValues);
    }

    return (
        <div className={"form-group"}>
            <form className="forms-repo" onSubmit={handleSubmit} >
                <div className={"token"}>
                    <label className={"labels"} htmlFor="token">Github API Token:</label>
                    <input form={"token"} type="password" id="token" name="token" onChange={handleChange} className={"form-control"} required />
                </div>
                <div id={"wraper-elem-4"}>
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>
        </div>
    );


}

export default Token;
