import React from "react";


function Success({setShowCreateRepo, setShowAddFiles, setShowAddContributors, setShowSuccess}) {

    const handleClick = () => {
        setShowCreateRepo(false);
        setShowAddFiles(false);
        setShowAddContributors(false);
        setShowSuccess(false);
    }

    return (
        <div className={"success"}>

            <div className={"success-message"}>
                <div className={"success-header"} >Success!</div>
                <button onClick={handleClick} className={"button"}>Create another repository</button>
            </div>

        </div>
    );
}

export default Success;