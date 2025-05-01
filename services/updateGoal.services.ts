import type { GoalProgress } from "../database/models/goal";
import { database } from "../database/config/database.config";

export function updateGoalByNameService({ name }: GoalProgress) {
  const getOldProgress = database.query(`SELECT progress FROM goals WHERE name = @name`);
  const oldProgresss = getOldProgress.get({name: name});
  const query = database.prepare(`UPDATE goals SET progress = @progress WHERE name = @name`);
  
  console.log(oldProgresss);
  
  database.transaction(() => {
    query.run({
      name: name,
      progress: (oldProgresss as {progress:number}).progress + 1, 
    });
  })();
};