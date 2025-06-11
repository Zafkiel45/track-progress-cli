import type { GoalDetails } from "../types/goal.types";

export function generateProgressBar(
  name: string,
  progress: number,
  target: number,
  date: string,
  failures: number,
  type: string
) {
  const progressInPercentage = calcProgressInPercentage(progress, target);
  const percentageInBar = calcPercentageOfBar(progressInPercentage, 40);

  let percentageInBarIdx = 0;
  let greenBar = "\x1b[32m";

  while (percentageInBarIdx < percentageInBar) {
    greenBar += "█";
    percentageInBarIdx++;
  }

  greenBar += "\x1b[0m";

  const darkGreenBars = generateDarkGreenBars(percentageInBarIdx);
  const summaryBar = generateBarProgressSummary(progressInPercentage, target);
  const metadata = generateBarMetadata({name,created_at: date,failures,type});
  
  console.log("\n" + metadata + "\n\n" + greenBar + darkGreenBars + summaryBar);
}

// the "idx" is the amount of light green bars. 
function generateDarkGreenBars(idx: number) {
  return `\x1b[38;5;22m${"█".repeat(Math.max(0, 40 - idx))}\x1b[0m`;
};

function generateBarMetadata({
  name,
  created_at,
  failures,
  type,
}: GoalDetails): string {
  const FAILURES: string = `\x1b[91m[ Failures: ${failures} ]\x1b[0m`;
  const CREATION_DATA: string = `\x1b[97m[ Created At: ${created_at} ]\x1b[0m`;
  const NAME: string = `=> basic inf: \x1b[93m[ Name: ${name} ]\x1b[0m`;
  const TYPE: string = `\x1b[95m[ TYPE: ${type} ]\x1b[0m`;

  const SEPARATOR: string = "=> metadata: ";
  return `${NAME}\n${SEPARATOR} ${TYPE} ${FAILURES} ${CREATION_DATA}`;
};

// This calc the amout of percentage in relation to target number. For example:
// my target number is 100, this will calc the current percentagem of progress 
// in relation to 100. 
function calcProgressInPercentage(progress: number, target: number) {
  return (progress / target) * 100;
}
// This calc the amount of percentage representation on bar progress. Each 1%
// turns one bar green. 
function calcPercentageOfBar(percentage: number, barLength: number) {
  return Math.floor((percentage / 100) * barLength);
};

function generateBarProgressSummary(progress: number, target: number) {
  return ` ${progress.toFixed(2).padEnd(6, " ")}% | ${progress}/${target}`;
};
