import type { NewGoal } from "../../database/models/goal";
import { database } from "../../database/config/database.config";
import { getDatetime } from "../../utils/getDate";
import { formatTextForDatabase } from "../../utils/goals.utils";
import { registerLogService } from "../logs_service/registerLog.services";

export function createNewGoal({name, target, created_at}: NewGoal) {
  const query = database.prepare(`
    INSERT INTO goals (name, target, created_at) VALUES (@name, @target, @created_at)
  `);

  database.transaction(() => {
    query.run({
      name: formatTextForDatabase(name),
      target: target,
      created_at: String(created_at)
    });
  })();

  registerLogService('create', name, getDatetime());
};