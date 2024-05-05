import Logger from "../../../lib/Logger";

export default function my_other_event(payload: any) {
    Logger.log("Received other event:", payload);
}
