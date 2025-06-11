import type { GoalFailure, GoalProgress, NewGoal } from "../database/models/goal";
import { formatTextForDatabase } from "../utils/goals.utils";
import { database } from "../database/config/database.config";
import { getDate, getDatetime } from "../utils/getDate";
import type { GoalDelete } from "../types/goal.types";
import { registerLogService } from "./logs_service/registerLog.services";

