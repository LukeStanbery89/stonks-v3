import Logger from "../../../lib/Logger";

export default function my_event(payload: any) {
    Logger.log("Received event:", payload);
}
