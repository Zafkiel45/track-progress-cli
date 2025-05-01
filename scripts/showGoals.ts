import type { GoalInfo } from "../types/goal.types";
import { database } from "../database/config/database.config";

export function showGoals() {
  const query = database.query(`SELECT name, progress, target FROM goals`);
  const goalInfo = query.all() as GoalInfo[];
  console.log('========== Generating the bars ⏳ ==========')
  console.log(' ');
  for(let goal of goalInfo) {
    const { name, progress, target } = goal;
    generateBar(name, progress, target);
  };
  console.log(' ');
  console.log('========== Bars generated successfully ✅ ==========');
};

function generateBar(name: string, progress: number, target: number) {
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
  const barName = `\x1b[33m${name.padEnd(20, ' ')}\x1b[0m`;

  console.log(barName + greenBar + whiteBars + summaryBar);
};

function calcProgressPercentage(progress: number, target:number) {
  return (progress / target) * 100;
};

function calcPercentageInBar(percentage: number, barLength: number) {
  return Math.floor((percentage / 100) * barLength);
};