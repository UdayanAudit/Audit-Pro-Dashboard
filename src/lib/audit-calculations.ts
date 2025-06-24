export interface TaxAuditInput {
  taxableIncome: number;
}

export interface TaxAuditResult {
  taxableIncome: number;
  taxRate: number;
  calculatedTax: number;
  compliance: "Compliant" | "Non-Compliant";
  discrepancy: number;
  recommendations: string[];
}

export interface SalaryReconciliationInput {
  reportedSalary: number;
  actualSalary: number;
}

export interface SalaryReconciliationResult {
  reportedSalary: number;
  actualSalary: number;
  variance: number;
  variancePercentage: number;
  status: "Matched" | "Variance Detected";
  adjustmentRequired: boolean;
  comments: string;
}

export interface ProfessionalTaxInput {
  declaredAmount: number;
  verifiedAmount: number;
}

export interface ProfessionalTaxResult {
  declaredAmount: number;
  verifiedAmount: number;
  difference: number;
  complianceStatus: "Compliant" | "Under-declared" | "Over-declared";
  penaltyApplicable: boolean;
  recommendedAction: string;
}

export interface OpeningBalanceInput {
  bookBalance: number;
  auditedBalance: number;
}

export interface OpeningBalanceResult {
  bookBalance: number;
  auditedBalance: number;
  variance: number;
  variancePercentage: number;
  materialityThreshold: number;
  isMaterial: boolean;
  adjustmentEntry: string;
  riskLevel: "Low" | "Medium" | "High";
}

export interface BankVouchingInput {
  bankStatement: number;
  cashBook: number;
}

export interface BankVouchingResult {
  bankStatement: number;
  cashBook: number;
  difference: number;
  reconciliationRequired: boolean;
  possibleCauses: string[];
  nextSteps: string[];
  riskAssessment: "Low" | "Medium" | "High";
}

export function calculateTaxAudit(input: TaxAuditInput): TaxAuditResult {
  const { taxableIncome } = input;

  // Progressive tax calculation (simplified)
  let taxRate = 0;
  let calculatedTax = 0;

  if (taxableIncome <= 250000) {
    taxRate = 0;
    calculatedTax = 0;
  } else if (taxableIncome <= 500000) {
    taxRate = 5;
    calculatedTax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 750000) {
    taxRate = 10;
    calculatedTax = 12500 + (taxableIncome - 500000) * 0.1;
  } else if (taxableIncome <= 1000000) {
    taxRate = 15;
    calculatedTax = 37500 + (taxableIncome - 750000) * 0.15;
  } else if (taxableIncome <= 1250000) {
    taxRate = 20;
    calculatedTax = 75000 + (taxableIncome - 1000000) * 0.2;
  } else if (taxableIncome <= 1500000) {
    taxRate = 25;
    calculatedTax = 125000 + (taxableIncome - 1250000) * 0.25;
  } else {
    taxRate = 30;
    calculatedTax = 187500 + (taxableIncome - 1500000) * 0.3;
  }

  const discrepancy = 0; // Would compare with declared tax in real scenario
  const compliance = discrepancy === 0 ? "Compliant" : "Non-Compliant";

  const recommendations = [
    "Verify all income sources are properly declared",
    "Check for eligible deductions under Section 80C",
    "Ensure proper documentation for all claims",
    "Review investment declarations",
  ];

  return {
    taxableIncome,
    taxRate,
    calculatedTax: Math.round(calculatedTax),
    compliance,
    discrepancy,
    recommendations,
  };
}

export function calculateSalaryReconciliation(
  input: SalaryReconciliationInput,
): SalaryReconciliationResult {
  const { reportedSalary, actualSalary } = input;
  const variance = actualSalary - reportedSalary;
  const variancePercentage =
    reportedSalary > 0 ? (variance / reportedSalary) * 100 : 0;
  const adjustmentRequired = Math.abs(variance) > 1000; // Threshold for adjustment

  let status: "Matched" | "Variance Detected" = "Matched";
  let comments = "Salary figures are properly reconciled.";

  if (Math.abs(variance) > 0) {
    status = "Variance Detected";
    if (variance > 0) {
      comments = `Actual salary exceeds reported salary by ₹${Math.abs(variance).toLocaleString()}. Verify additional components.`;
    } else {
      comments = `Reported salary exceeds actual salary by ₹${Math.abs(variance).toLocaleString()}. Review calculations.`;
    }
  }

  return {
    reportedSalary,
    actualSalary,
    variance,
    variancePercentage: Math.round(variancePercentage * 100) / 100,
    status,
    adjustmentRequired,
    comments,
  };
}

export function calculateProfessionalTax(
  input: ProfessionalTaxInput,
): ProfessionalTaxResult {
  const { declaredAmount, verifiedAmount } = input;
  const difference = verifiedAmount - declaredAmount;

  let complianceStatus: "Compliant" | "Under-declared" | "Over-declared" =
    "Compliant";
  let penaltyApplicable = false;
  let recommendedAction =
    "No action required. Professional tax is properly declared.";

  if (difference > 0) {
    complianceStatus = "Under-declared";
    penaltyApplicable = difference > 500;
    recommendedAction = `Pay additional ₹${difference} professional tax. ${penaltyApplicable ? "Penalty may be applicable." : ""}`;
  } else if (difference < 0) {
    complianceStatus = "Over-declared";
    recommendedAction = `Claim refund of ₹${Math.abs(difference)} overpaid professional tax.`;
  }

  return {
    declaredAmount,
    verifiedAmount,
    difference,
    complianceStatus,
    penaltyApplicable,
    recommendedAction,
  };
}

export function calculateOpeningBalance(
  input: OpeningBalanceInput,
): OpeningBalanceResult {
  const { bookBalance, auditedBalance } = input;
  const variance = auditedBalance - bookBalance;
  const variancePercentage =
    bookBalance !== 0 ? (variance / bookBalance) * 100 : 0;
  const materialityThreshold = Math.abs(bookBalance) * 0.05; // 5% materiality
  const isMaterial = Math.abs(variance) > materialityThreshold;

  let adjustmentEntry = "No adjustment required.";
  let riskLevel: "Low" | "Medium" | "High" = "Low";

  if (isMaterial) {
    if (variance > 0) {
      adjustmentEntry = `Dr. Opening Balance ₹${Math.abs(variance)} Cr. Adjustment Account ₹${Math.abs(variance)}`;
      riskLevel = "High";
    } else {
      adjustmentEntry = `Dr. Adjustment Account ₹${Math.abs(variance)} Cr. Opening Balance ₹${Math.abs(variance)}`;
      riskLevel = "High";
    }
  } else if (Math.abs(variancePercentage) > 1) {
    riskLevel = "Medium";
  }

  return {
    bookBalance,
    auditedBalance,
    variance,
    variancePercentage: Math.round(variancePercentage * 100) / 100,
    materialityThreshold: Math.round(materialityThreshold),
    isMaterial,
    adjustmentEntry,
    riskLevel,
  };
}

export function calculateBankVouching(
  input: BankVouchingInput,
): BankVouchingResult {
  const { bankStatement, cashBook } = input;
  const difference = bankStatement - cashBook;
  const reconciliationRequired = Math.abs(difference) > 0;

  const possibleCauses = [];
  const nextSteps = [];
  let riskAssessment: "Low" | "Medium" | "High" = "Low";

  if (reconciliationRequired) {
    if (difference > 0) {
      possibleCauses.push(
        "Bank charges not recorded in cash book",
        "Interest credited by bank not recorded",
        "Direct deposits not updated in cash book",
      );
    } else {
      possibleCauses.push(
        "Outstanding cheques not cleared",
        "Bank charges recorded twice",
        "Deposits in transit",
      );
    }

    nextSteps.push(
      "Prepare bank reconciliation statement",
      "Verify outstanding items",
      "Update cash book with missing entries",
      "Confirm bank charges and interest",
    );

    const differencePercentage =
      cashBook !== 0 ? Math.abs(difference / cashBook) * 100 : 0;
    if (differencePercentage > 10) {
      riskAssessment = "High";
    } else if (differencePercentage > 2) {
      riskAssessment = "Medium";
    }
  } else {
    possibleCauses.push("Bank and cash book are perfectly reconciled");
    nextSteps.push(
      "No immediate action required",
      "Continue regular monitoring",
    );
  }

  return {
    bankStatement,
    cashBook,
    difference,
    reconciliationRequired,
    possibleCauses,
    nextSteps,
    riskAssessment,
  };
}
