import type { NewGoal } from "../database/models/goal";
import { database } from "../database/config/database.config";

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