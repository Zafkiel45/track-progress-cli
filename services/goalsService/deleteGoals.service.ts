import type { GoalDelete } from "../../types/goal.types";
import { database } from "../../database/config/database.config";
import { getDatetime } from "../../utils/getDate";
import { formatTextForDatabase } from "../../utils/goals.utils";
import { registerLogService } from "../logs_service/registerLog.services";

export function deleteGoalService({name}: GoalDelete) {
  const query = database.prepare(`DELETE FROM goals WHERE name = @name`);
  database.transaction(() => query.run({name: formatTextForDatabase(name)}))();
  registerLogService('delete', name, getDatetime());
};