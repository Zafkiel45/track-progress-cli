import { database } from "../database/config/database.config";
import type { History } from "../types/history.types";

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
      const logs  = query.all({type: type}) as History[];

      for(let log of logs) {
        const dateAndTime = log.datetime.split(' ');
        console.log(`📄 [ ${log.type} ]: \x1b[33m	${log.target}\x1b[0m on \x1b[36m${dateAndTime[0]}\x1b[0m at \x1b[35m${dateAndTime[1]}\x1b[0m`)
      };
    }
  };
};

