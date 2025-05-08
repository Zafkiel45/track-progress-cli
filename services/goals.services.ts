import type { GoalFailure, GoalProgress, NewGoal } from "../database/models/goal";
import { formatGoalName } from "../utils/goals.utils";
import { database } from "../database/config/database.config";
import { getDate, getDatetime } from "../utils/getDate";
import type { GoalDelete } from "../types/goal.types";
import { registerLogService } from "./logs.services";

export function createNewGoal({name, target, created_at}: NewGoal) {
  const query = database.prepare(`
    INSERT INTO goals (name, target, created_at) VALUES (@name, @target, @created_at)
  `);

  database.transaction(() => {
    query.run({
      name: formatGoalName(name),
      target: target,
      created_at: String(created_at)
    });
  })();

  registerLogService('Create', name, getDatetime());
};

export function updateGoalProgressService({ name }: GoalProgress) {
  const getOldProgress = database.query(`SELECT progress,target FROM goals WHERE name = @name`);
  const oldProgresss = getOldProgress.get({
    name: formatGoalName(name)
  }) as {progress: number, target: number};

  if(oldProgresss.progress >= oldProgresss.target) {
    console.log('Awesome! This goal is already finished 🔥');
    return;
  };

  const query = database.prepare(`UPDATE goals SET progress = @progress WHERE name = @name`);
  
  database.transaction(() => {
    query.run({
      name: formatGoalName(name),
      progress: oldProgresss.progress + 1, 
    });
  })();

  registerLogService('Update', name, getDatetime());
};

export function updateGoalFailureService({ name }: GoalFailure) {
  const getPreviusFailure = database.query(`SELECT failures FROM goals WHERE name = @name`);
  const previousFailure = getPreviusFailure.get({name: formatGoalName(name)});
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
      name: formatGoalName(name)
    })
  })();

  registerLogService('Failure', name, getDatetime());
};

export function deleteGoalService({name}: GoalDelete) {
  const query = database.prepare(`DELETE FROM goals WHERE name = @name`);
  database.transaction(() => query.run({name: formatGoalName(name)}))();
  registerLogService('Delete', name, getDatetime());
};