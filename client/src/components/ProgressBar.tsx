import React from "react";

interface ProgressBarProps {
    label: string,
    progress: number,
}

const style = {
    height: "40px",
};

const ProgressBar = ({ label, progress }: ProgressBarProps) => {
    return (
        <div className="progress" role="progressbar">
            <div className="progress-bar overflow-visible progress-bar-striped progress-bar-animated" style={{ width: `${progress}%`, ...style }}>{label}</div>
        </div>
    );
};

export default ProgressBar;
