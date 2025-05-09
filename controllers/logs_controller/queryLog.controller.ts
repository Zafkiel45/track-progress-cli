import { showAllHistoryByIntervalService, showHistoryService } from '../../services/logs_service/queryLog.services';
import type { historyType } from "../../types/history.types";

export function showHistoryController(type: historyType, from?: string, to?: string) {
  try {
    const logTypes = ['all', 'update', 'create', 'delete', 'failure'];

    if(!logTypes.includes(type)) {
      throw new Error(
        "The type provided is not accepted." +
        "Please, use some type suported:" +
        "'all', 'update', 'create', 'delete', 'failure'"
      );
    };

    if(!from || !to) {
      showHistoryService(type);
    } else {
      showAllHistoryByIntervalService(type, from, to);
    }
  } catch(err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error occurred');
    }
  };
};