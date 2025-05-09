import { showAllHistoryByIntervalService, showHistoryService } from '../../services/logs_service/queryLog.services';
import type { historyType } from "../../types/history.types";

export function showHistoryController(type: historyType, from?: string, to?: string) {
  try {
    if(!type) {
      throw new Error(`
        Please, pass some type how the first argument. 
        Suported types: "all", "update", "failure", "create", "delete"  
      `.trim());
    };

    if(!from || !to) {
      showHistoryService(type);
    } else {
      showAllHistoryByIntervalService(type, from, to);
    }
  } catch(err) {
    console.error(err);
  }
};