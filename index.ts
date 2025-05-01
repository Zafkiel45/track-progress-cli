import './database/migrations/database.migrations';
import { createNewGoalController } from './controllers/createGoal.controllers';
import { getDate } from './utils/getDate';

const args = process.argv.slice(2);

switch(args[0]) {
  case 'create-goal':
    createNewGoalController({
      name: args[1],
      target: parseInt(args[2]),
      created_at: getDate(),
    });
  break
}