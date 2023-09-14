import React, {useState} from "react";

function Contributors({setShowSuccess}) {

    const [contributors, setContributors] = useState([]);

    const handleReset = (e, index) => {
        e.preventDefault();
        const updatedContributors = [...contributors];
        updatedContributors.splice(index, 1);
        setContributors(updatedContributors);
    };

    const handleChange = (e,index) => {
        const updatedContributors = [...contributors];
        updatedContributors[index] = e.target.value;
        setContributors(updatedContributors);
    };
    const handleRest= (e) => {
        e.preventDefault();
        const formValues = {
            contributors_name: contributors.join(","),
        };
        fetch('http://localhost:5000/api/contributors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result['status'] === 'success') {
                    setShowSuccess(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onClickEvent = () => {
        setContributors([...contributors, ""]);
    };

    return (
        <div>
            <form className={"forms"} onSubmit={handleRest}>
                <div className={"contributors-wrapper"}>
                    <div>
                        {contributors.map((contributor, index) => (
                            <div key={index}>
                                <label className={"labels"} htmlFor={`contributors_name_${index}`}>Contributor's name:</label>
                                <input
                                    type = "text"
                                    id = "contributors_name"
                                    name = {`contributors_name_${index}`}
                                    value = {contributor}
                                    onChange = {(e) => handleChange(e, index)}
                                />
                                <button
                                    className={"button"}
                                    type="button"
                                    id = "remove-button"
                                    onClick={(e) => handleReset(e, index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    <input className={"button add"} type="button" value="Add Contributor" onClick={onClickEvent} />
                    <br />
                    <input className={"button"} type="submit" value="Submit" onClick={handleRest}/>
                    </div>
            </form>
        </div>
    );

}
export default Contributors;
