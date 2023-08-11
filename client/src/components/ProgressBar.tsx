import React from "react";
import { BS_BACKGROUND } from "../types/types";

interface ProgressBarProps {
    progress: number,
    label?: string,
    theme?: BS_BACKGROUND,
    animate?: boolean,
    striped?: boolean,
}

/**
 * A reusable Bootstrap progress bar component.
 *
 * @param params.progress Progress bar progress as a number.
 * @param params.label    (optional) Text to be displayed inside the progress bar.
 * @param params.theme    (optional) Value of BS_BACKGROUND enum. (default: BS_BACKGROUND.BG_PRIMARY)
 * @param params.striped  (optional) Determines if the progress bar should be striped (true) or solid (false). (default: false)
 * @param params.animate  (optional) Determines if the progress bar stripes (if enabled) should animate. (default: false)
 */
const ProgressBar = ({ progress, label, theme, striped, animate }: ProgressBarProps) => {
    const style = {
        height: "40px",
    };

    return (
        <div className="progress" role="progressbar" style={style}>
            <div className={`progress-bar overflow-visible ${striped ? "progress-bar-striped" : ""} ${animate ? "progress-bar-animated" : ""} ${theme || BS_BACKGROUND.BG_PRIMARY}`} style={{ width: `${progress}%` }}>{label !== undefined ? label : `${progress}%`}</div>
        </div>
    );
};

export default ProgressBar;
