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
  if (typeof from === "undefined" || typeof to === "undefined") {
    if (formatTextForDatabase(type) === "all") {
      const query = database.query("SELECT type,target,datetime FROM history");
      const logs = query.all() as History[];

      iterateOverLogs(logs);
    } else {
      const query = database.query(`
        SELECT type,target,datetime FROM history WHERE type = @type  
      `);
      const logs = query.all({
        type: formatTextForDatabase(type),
      }) as History[];

      iterateOverLogs(logs);
    }
  } else if (typeof to === "string" && typeof from === "string") {
    if (formatTextForDatabase(type) === "all") {
      const query = database.query(`
        SELECT type,target,datetime 
        FROM history 
        WHERE datetime 
        BETWEEN @from AND @to
      `);

      const logs = query.all({
        to: formatTextForDatabase(to),
        from: formatTextForDatabase(from),
      }) as History[];

      iterateOverLogs(logs);
    } else {
      const query = database.query(`
        SELECT type,target,datetime 
        FROM history 
        WHERE datetime 
        BETWEEN @from AND @to AND type = @type
      `);

      const logs = query.all({
        to: formatTextForDatabase(to),
        from: formatTextForDatabase(from),
        type: formatTextForDatabase(type),
      }) as History[];

      iterateOverLogs(logs);
    }
  } else {
    console.log(
      '❌ You forgot to pass two dates. Example "2025-07-08 17:20:00"'
    );
  }
}
