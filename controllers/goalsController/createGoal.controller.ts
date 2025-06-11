import { createNewGoal } from "../../services/goalsService/createGoal.service";
import { isInvalidString } from "../../utils/isInvalidString";
import type { NewGoal } from "../../database/models/goal";
import { isValidNumber } from "../../utils/isValidId";

export function createNewGoalController({
  name,
  target,
  created_at,
  type,
}: NewGoal) {
  try {
    isValidNumber(target);

    if (isInvalidString(name) || isInvalidString(type)) {
      throw new Error("Make sure to write correctly 'name' and 'type'.");
    };

    createNewGoal({ name: name, target: target, created_at, type });
    console.log("New Goal created successfully ✅");
    return;
  } catch (err) {

    if(err instanceof Error) {
      console.error(err.message);
      return;
    };

    console.error('Unknown Error');
    return; 
  }
}
