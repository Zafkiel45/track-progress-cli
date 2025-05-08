import { database } from "../database/config/database.config";
import type { History } from "../types/history.types";
import { iterateOverLogs } from "../utils/interateOverLogs";

export function registerLogService(type: string, target: string, datetime: string) {
  try {
    const query = database.prepare(`
      INSERT INTO history (type, target, datetime) 
      VALUES (@type, @target, @datetime)
    `); 
  
    database.transaction(() => {
      query.run({
        type: type, 
        target: target,
        datetime: datetime, 
      });
    })();
  
    console.log('✅ activity registred on history');
  } catch(err) {
    console.error(err);
  };
};



export function showHistoryService(type: string, from?: string, to?: string) {
  if(typeof from === 'undefined' || typeof to === 'undefined') {
    if(type === 'all') {
      const query = database.query('SELECT type,target,datetime FROM history');
      const logs  = query.all() as History[];

      iterateOverLogs(logs);
    } 
  };
};

