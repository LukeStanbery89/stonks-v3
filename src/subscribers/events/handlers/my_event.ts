import Logger from "@lukestanbery/ledger";

export default function my_event(payload: any) {
    Logger.log("Received event:", payload);
}
