import type { GoalProgress, GoalFailure} from "../database/models/goal";
import { database } from "../database/config/database.config";
import { getDate } from "../utils/getDate";

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

export function updateGoalFailureByNameService({ name }: GoalFailure) {
  const getPreviusFailure = database.query(`SELECT failures FROM goals WHERE name = @name`);
  const previousFailure = getPreviusFailure.get({name: name});
  const query = database.prepare(`
    UPDATE goals
    SET failures = @failure, last_failure = @lastFailure, progress = @progress 
    WHERE name = @name  
  `);

  database.transaction(() => {
    query.run({
      failure: (previousFailure as {failures: number}).failures + 1,
      lastFailure: getDate(),
      progress: 0,
      name: name
    })
  })();
};