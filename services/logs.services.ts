import { database } from "../database/config/database.config";
import type { History } from "../types/history.types";
import { formatTextForDatabase } from "../utils/goals.utils";
import { iterateOverLogs } from "../utils/interateOverLogs";

export function registerLogService(
  type: string,
  target: string,
  datetime: string
) {
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

    console.log("✅ activity registred on history");
  } catch (err) {
    console.error(err);
  }
}

export function showHistoryService(type: string, from?: string, to?: string) {
  const historyType = formatTextForDatabase(type);
  const fromInterval = formatTextForDatabase(from || '');
  const toInterval = formatTextForDatabase(to || '');

  const intervalsIsString = 
    typeof toInterval === "string" && 
    typeof fromInterval === "string";

  const intervalsIsNotEmpty = 
    toInterval !== ''.trim() && 
    fromInterval !== ''.trim();

  const intervalsAreUndefined = 
    typeof toInterval === "undefined" && 
    typeof fromInterval === "undefined";

  if (intervalsAreUndefined || !intervalsIsNotEmpty) {
    if (historyType === "all") {showAllHistoryService()} 
    else {showHistoryByTypeService(historyType)};
  } else if (intervalsIsString && intervalsIsNotEmpty) {
    if (historyType === "all") {showAllHistoryByIntervalService(fromInterval, toInterval)} 
    else { showHistoryByTypeIntervalService(fromInterval, toInterval, historyType)};
  } else {
    console.log('❌ You forgot to pass two dates. Example "2025-07-08 17:20:00"');
  };
};

export function showHistoryByTypeService(type: string) {
  try {
    const query = database.query(`
      SELECT type,target,datetime 
      FROM history WHERE type = @type  
    `);

    const logs = query.all({ type: type }) as History[];

    if(logs.length === 0) {
      console.log('🟠 There are not records of history with the type: ', type);
      return;
    };

    iterateOverLogs(logs);
  } catch (err) {
    console.error(err);
  };
};

export function showAllHistoryByIntervalService(from: string, to: string) {
  try {
    const query = database.query(`
      SELECT type,target,datetime 
      FROM history 
      WHERE datetime 
      BETWEEN @from AND @to
    `);

    const logs = query.all({to: to, from: from}) as History[];

    if(logs.length === 0) {
      console.log('🟠 There are not records of history with this interval:');
      console.log('🟠 - check if the intervals are correct.');
      console.log('🟠 - check if the interval exists with "history all"');
      return;
    };

    iterateOverLogs(logs);
  } catch (err) {
    console.error(err);
  };
};

export function showHistoryByTypeIntervalService(from: string, to: string, type: string) {
  try {
   const query = database.query(`
    SELECT type,target,datetime 
    FROM history 
    WHERE datetime 
    BETWEEN @from AND @to AND type = @type
  `);

  const logs = query.all({to: to, from: from,type: type,}) as History[];
  if(logs.length === 0) {
    console.log('🟠 There are not records of history with the type and interval: ', type,'from', from, 'to', to);
    return;
  };
  iterateOverLogs(logs);
  } catch(err) {
    console.error(err);
  };
};

export function showAllHistoryService() {
  try {
    const query = database.query("SELECT type,target,datetime FROM history");
    const logs = query.all() as History[];
    if(logs.length === 0) {
      console.log('🟠 There are not records of history');
      return;
    };
    iterateOverLogs(logs);
  } catch (err) {
    console.error(err);
  };
};