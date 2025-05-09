import type { History } from "../../types/history.types";
import { database } from "../../database/config/database.config";
import { iterateOverLogs } from "../../utils/interateOverLogs";

export function showHistoryService(type = 'all') {
  try {
    const queryBytype = database.query(`
      SELECT type,target,datetime 
      FROM history WHERE type = @type  
    `);

    const queryAll = database.query(`
      SELECT type,target,datetime 
      FROM history  
    `);

    if(type === 'all') {
      console.log('🟠 No log type detected... Showing all logs');
      const logs = queryAll.all() as History[];

      if(logs.length === 0) {
        throw new Error('The list is empty');
      };

      iterateOverLogs(logs);
    } else {
      console.log(`🟠 Log type detected... Showing all logs of ${type}`);
      const logs = queryBytype.all({ type: type }) as History[];

      if(logs.length === 0) {
        throw new Error('The list is empty');
      };

      iterateOverLogs(logs);
    }

  } catch (err) {
    if(err instanceof Error) {
      console.error(err.message);
    } else {
      console.log('Unknow error');
    };
  };
};

export function showAllHistoryByIntervalService(type = 'all', from: string, to: string) {
  try {
    const queryBytype = database.query(`
      SELECT type,target,datetime 
      FROM history WHERE datetime BETWEEN @from AND @to AND type = @type 
    `);

    const queryAll = database.query(`
      SELECT type,target,datetime 
      FROM history WHERE datetime BETWEEN @from AND @to
    `);

    if(type === 'all') {
      console.log('🟠 No log type detected... Showing all logs for the interval');
      const logs = queryAll.all({to: to, from: from}) as History[];

      if(logs.length === 0) {
        throw new Error('The list is empty');
      };

      iterateOverLogs(logs);
    } else {
      console.log(`🟠 Log type detected... Showing all logs of ${type} for the interval`);
      const logs = queryBytype.all({to: to, from: from,type: type,}) as History[];

      if(logs.length === 0) {
        throw new Error('The list is empty');
      };

      iterateOverLogs(logs);
    };
  } catch (err) {
    console.error(err);
  };
};
