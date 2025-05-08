import type { History } from "../types/history.types";

export function iterateOverLogs(logs: History[]) {
  for(let log of logs) {
    const dateAndTime = log.datetime.split(' ');
    console.log(`📄 [ ${log.type} ]: \x1b[33m${log.target}\x1b[0m on \x1b[36m${dateAndTime[0]}\x1b[0m at \x1b[35m${dateAndTime[1]}\x1b[0m`)
  };
}