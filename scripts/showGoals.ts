import type { GoalDetails, GoalInfo } from "../types/goal.types";
import { database } from "../database/config/database.config";

export function showGoals() {
  const query = database.query(`SELECT name, progress, target, failures, created_at, type FROM goals`);
  const goalInfo = query.all() as GoalInfo[];
  console.log('========== Generating the bars ⏳ ==========')
  console.log(' ');
  for(let goal of goalInfo) {
    const { name, progress, target, created_at , failures, type} = goal;
    generateBar(name, progress, target, created_at, failures, type);
  };
  console.log(' ');
  console.log('========== Bars generated successfully ✅ ==========');
};

function generateBar(name: string, progress: number, target: number, date: string, failures: number, type: string) {
  const progressPercentage = calcProgressPercentage(progress, target);
  const percentageInBar = calcPercentageInBar(progressPercentage, 40);
 
  let percentageInBarIdx = 0;
  let greenBar = '\x1b[32m';

  while(percentageInBarIdx < percentageInBar) {
    greenBar += '█'
    percentageInBarIdx++;
  }
  
  greenBar += '\x1b[0m'
  const whiteBars = `\x1b[38;5;22m${'█'.repeat(Math.max(0, 40 - percentageInBarIdx))}\x1b[0m`;
  const summaryBar = ` ${(progressPercentage.toFixed(2).padEnd(6, ' '))}% | ${progress}/${target}`;
  const barName = generateBarInformation({name: name, created_at: date, failures: failures, type});
  console.log("\n" + barName + "\n\n" + greenBar + whiteBars + summaryBar);
};

function calcProgressPercentage(progress: number, target:number) {
  return (progress / target) * 100;
};

function calcPercentageInBar(percentage: number, barLength: number) {
  return Math.floor((percentage / 100) * barLength);
};

function generateBarInformation({name, created_at, failures, type}: GoalDetails): string {
  const FAILURES: string = `\x1b[91m[ Failures: ${failures} ]\x1b[0m`;
  const CREATION_DATA: string = `\x1b[97m[ Created At: ${created_at} ]\x1b[0m`;
  const NAME: string = `=> basic inf: \x1b[93m[ Name: ${name} ]\x1b[0m`
  const TYPE: string = `\x1b[95m[ TYPE: ${type} ]\x1b[0m`
  const SEPARATE: string = "=> metadata: "
  return `${NAME}\n${SEPARATE} ${TYPE} ${FAILURES} ${CREATION_DATA}`;
};