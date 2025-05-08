import { showHistoryService } from "../services/logs.services";
import type { historyType } from "../types/history.types";

export function showHistoryController(type: historyType, from?: string, to?: string) {
  try {
    if(!type) {
      throw new Error(`
        Please, pass some type how the first argument. 
        Suported types: "all", "update", "failure", "create", "delete"  
      `.trim());
    };

    showHistoryService(type, from, to);
  } catch(err) {
    console.error(err);
  }
};