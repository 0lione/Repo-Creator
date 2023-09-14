import {useState} from "react";

function AddFiles({setShowAddContributors, change, request}) {
    const [formValues, setFormValues] = useState({
        language: '',
        readme: '',
        readme_content: '',
    });
    const [showOtherInput, setShowOtherInput] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        request(e, "create-files", formValues, setShowAddContributors);
    }
    const handleChange = (e) => {
        change(e,setFormValues);
    }

    const handleChangeSelect = (e) => {
        if (e.target.value === "Other") {
            setShowOtherInput(true);
        } else {
            setShowOtherInput(false);
        }
        handleChange(e);
    }

    const onClickEvent = () => {
        document.getElementById("readme_content").style.visibility = "visible";
        document.getElementById("content_label").style.visibility = "visible";
        formValues.readme = "True";
    }

    return (
        <div className={"form-group"}>
            <form className={"forms"} onSubmit={handleSubmit}>
                <div className={"files-wrapper"}>
                    <div className={"block1"}>
                        <label className={"labels"} htmlFor="languae">Language:</label>
                        <div>
                            <select name={"language"} onChange={handleChangeSelect} className="form-select form-select-custom">
                                <option value="" disabled selected>Select your option</option>
                                <option value="python" >Python</option>
                                <option value="java" >Java</option>
                                <option value="c" >C</option>
                                <option value="cpp" >C++</option>
                                <option value="javascript" >Javascript</option>
                                <option value="Other">Other</option>
                            </select>

                            {showOtherInput && (
                                <div>
                                    <label className={"labels"} htmlFor="otherInput">Other:</label>
                                    <input type="text" id="otherInput" name={"language"}  onChange={handleChange} className="form-control" />
                                </div>
                            )}
                        </div>
                        <br />
                    </div>
                    <div className={"block2"}>
                    <input
                        className={"button"}
                        type={"button"}
                        value={"Add Readme"}
                        id = "readme"
                        name = "readme"
                        onClick = {onClickEvent}
                    />
                    <br />
                    <label id={"content_label"} className={"labels"} htmlFor="readme_content" style={{visibility: "hidden"}}>Readme content:</label>
                    <input
                        type="text"
                        id="readme_content"
                        name="readme_content"
                        onChange={handleChange}
                        style={{visibility: "hidden"}}
                        className={"form-control"}
                    />
                    <br />
                    </div>
                </div>
                <input className={"button"} type="submit" value="Submit"/>
            </form>
        </div>
    );
}
export default AddFiles;
