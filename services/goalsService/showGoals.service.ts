import { database } from "../../database/config/database.config";
import { generateProgressBar } from "../../utils/generateBar";
import type { Goal } from "../../database/models/goal";

export function showGoalsService() {
  const dbQuery = database.query(`
    SELECT name, progress, target, failures, created_at, type FROM goals
  `);

  const goalInfo = dbQuery.all() as Goal[];
  console.log('=============== Generating the bars ⏳ =======================');
  console.log(' ');

  for(let goal of goalInfo) {
    const { name, progress, target, created_at , failures, type} = goal;
    generateProgressBar(name, progress, target, created_at, failures, type);
  };

  console.log(' ');
  console.log('========== Bars generated successfully ✅ ====================');
};