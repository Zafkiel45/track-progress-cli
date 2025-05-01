import type { GoalFailure, GoalProgress, NewGoal } from "../database/models/goal";
import { database } from "../database/config/database.config";
import { getDate } from "../utils/getDate";
import type { GoalDelete } from "../types/goal.types";

export function createNewGoal({name, target, created_at}: NewGoal) {
  const query = database.prepare(`
    INSERT INTO goals (name, target, created_at) VALUES (@name, @target, @created_at)
  `);

  database.transaction(() => {
    query.run({
      name: name,
      target: target,
      created_at: String(created_at)
    });
  })()
};

export function updateGoalProgressService({ name }: GoalProgress) {
  const getOldProgress = database.query(`SELECT progress,target FROM goals WHERE name = @name`);
  const oldProgresss = getOldProgress.get({name: name}) as {progress: number, target: number};

  if(oldProgresss.progress >= oldProgresss.target) {
    console.log('Awesome! This goal is already finished 🔥');
    return;
  };

  const query = database.prepare(`UPDATE goals SET progress = @progress WHERE name = @name`);
  
  database.transaction(() => {
    query.run({
      name: name,
      progress: oldProgresss.progress + 1, 
    });
  })();
};

export function updateGoalFailureService({ name }: GoalFailure) {
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

export function deleteGoalService({name}: GoalDelete) {
  const query = database.prepare(`DELETE FROM goals WHERE name = @name`);
  database.transaction(() => query.run({name: name}))();
};