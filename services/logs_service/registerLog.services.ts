import { database } from "../../database/config/database.config";

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
