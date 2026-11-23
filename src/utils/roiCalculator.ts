import { RoiInputs, RoiResults } from "../types/saas";

export const DEFAULT_ROI_INPUTS: RoiInputs = {
  teamSize: 8,
  avgSalary: 12000,
  hoursWastedPerWeek: 12,
  monthlyInfraCost: 4500,
  efficiencyGainPct: 35,
};

export function calculateRoi(inputs: RoiInputs): RoiResults {
  const { teamSize, avgSalary, hoursWastedPerWeek, monthlyInfraCost, efficiencyGainPct } = inputs;

  const totalDevPayrollMonth = teamSize * avgSalary * 1.6;
  const hourlyRate = totalDevPayrollMonth / (teamSize * 160);
  const annualDevCost = totalDevPayrollMonth * 12;

  const hoursWastedAnnual = teamSize * hoursWastedPerWeek * 50;
  const hoursSavedAnnual = Math.round(hoursWastedAnnual * (efficiencyGainPct / 100));
  const laborSavingsAnnual = hoursSavedAnnual * hourlyRate;

  const infraSavingsAnnual = (monthlyInfraCost * 12) * 0.28;
  const totalAnnualSavings = laborSavingsAnnual + infraSavingsAnnual;

  const licenseAnnual = (299 * 12) + (teamSize * 49 * 12);
  const netAnnualReturn = Math.max(0, totalAnnualSavings - licenseAnnual);
  const roiPercentage = licenseAnnual > 0 ? Math.round((netAnnualReturn / licenseAnnual) * 100) : 0;
  const paybackMonths = totalAnnualSavings > 0 ? Number(((licenseAnnual / (totalAnnualSavings / 12))).toFixed(1)) : 0;

  const months = ["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6", "Mês 7", "Mês 8", "Mês 9", "Mês 10", "Mês 11", "Mês 12"];
  let accumulated = 0;
  const monthlySavings = totalAnnualSavings / 12;

  const monthlyProjections = months.map((m) => {
    accumulated += monthlySavings;
    const baseMonthCost = (annualDevCost + (monthlyInfraCost * 12)) / 12;
    return {
      month: m,
      withoutPlatform: Math.round(baseMonthCost),
      withPlatform: Math.round(baseMonthCost - monthlySavings + (licenseAnnual / 12)),
      accumulatedSavings: Math.round(accumulated),
    };
  });

  return {
    annualDevCost,
    hoursSavedAnnual,
    annualSavings: Math.round(totalAnnualSavings),
    netAnnualReturn: Math.round(netAnnualReturn),
    roiPercentage,
    paybackMonths,
    monthlyProjections,
  };
}