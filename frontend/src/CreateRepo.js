import {useState} from "react";
import Slider from "./slider";

function CreateRepo({setShowAddFiles, change, request}) {

    const [formValues, setFormValues] = useState({
        repo_name: '',
        repo_description: '',
        repo_private: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        request(e, "create-repo", formValues,setShowAddFiles);
    }
    const handleChange = (e) => {
        change(e,setFormValues);
    }

    return (
        <div className={"form-group"}>
            <form className="forms-repo" onSubmit={handleSubmit} >
                <div className={"Content-Wrapper"}>
                    <div className={"block1"}>
                        <div id={"wraper-elem-1"}>
                            <label className={"labels"} htmlFor="repo_name">Repo name:</label>
                            <input
                                type="text"
                                id="repo_name"
                                name="repo_name"
                                onChange={handleChange}
                                className={"form-control"}
                                required
                            />
                            <br />
                        </div>
                        <div id={"wraper-elem-2"}>
                            <label className={"labels"} htmlFor="repo_description">Repo description:</label>
                            <input
                                type="text"
                                id="repo_description"
                                name="repo_description"
                                onChange={handleChange}
                                className={"form-control"}
                            />
                            <br />
                        </div>
                    </div>
                    <div id={"wraper-elem-3"}>
                        <Slider
                            slideCompleted={formValues.repo_private}
                            setSlideCompleted={(value) =>
                                setFormValues((prevFormValues) => ({
                                    ...prevFormValues,
                                    repo_private: value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div id={"wraper-elem-4"}>
                    <input className={"button"} type="submit" value="Create Repo"/>
                </div>
            </form>
        </div>
    );
}
export default CreateRepo;
