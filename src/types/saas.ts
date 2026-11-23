export interface RoiInputs {
  teamSize: number;
  avgSalary: number;
  hoursWastedPerWeek: number;
  monthlyInfraCost: number;
  efficiencyGainPct: number;
}

export interface RoiResults {
  annualDevCost: number;
  hoursSavedAnnual: number;
  annualSavings: number;
  netAnnualReturn: number;
  roiPercentage: number;
  paybackMonths: number;
  monthlyProjections: {
    month: string;
    withoutPlatform: number;
    withPlatform: number;
    accumulatedSavings: number;
  }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  cta: string;
}