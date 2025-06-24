import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload";
import {
  Calculator,
  TrendingUp,
  Shield,
  Scale,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  FileText,
} from "lucide-react";
import {
  calculateTaxAudit,
  calculateSalaryReconciliation,
  calculateProfessionalTax,
  calculateOpeningBalance,
  calculateBankVouching,
  type TaxAuditResult,
  type SalaryReconciliationResult,
  type ProfessionalTaxResult,
  type OpeningBalanceResult,
  type BankVouchingResult,
} from "@/lib/audit-calculations";

const Index = () => {
  // Tool 1: Tax Audit Verification
  const [taxIncome, setTaxIncome] = useState("");
  const [taxResult, setTaxResult] = useState<TaxAuditResult | null>(null);

  // Tool 2: Salary Reconciliation
  const [reportedSalary, setReportedSalary] = useState("");
  const [actualSalary, setActualSalary] = useState("");
  const [salaryResult, setSalaryResult] =
    useState<SalaryReconciliationResult | null>(null);

  // Tool 3: Professional Tax Reconciliation
  const [declaredPTax, setDeclaredPTax] = useState("");
  const [verifiedPTax, setVerifiedPTax] = useState("");
  const [ptaxResult, setPtaxResult] = useState<ProfessionalTaxResult | null>(
    null,
  );

  // Tool 4: Opening Balance Verification
  const [bookBalance, setBookBalance] = useState("");
  const [auditedBalance, setAuditedBalance] = useState("");
  const [balanceResult, setBalanceResult] =
    useState<OpeningBalanceResult | null>(null);

  // Tool 5: Bank Vouching
  const [bankStatement, setBankStatement] = useState("");
  const [cashBook, setCashBook] = useState("");
  const [bankResult, setBankResult] = useState<BankVouchingResult | null>(null);

  const handleTaxAudit = () => {
    if (taxIncome) {
      const result = calculateTaxAudit({
        taxableIncome: parseFloat(taxIncome),
      });
      setTaxResult(result);
    }
  };

  const handleSalaryReconciliation = () => {
    if (reportedSalary && actualSalary) {
      const result = calculateSalaryReconciliation({
        reportedSalary: parseFloat(reportedSalary),
        actualSalary: parseFloat(actualSalary),
      });
      setSalaryResult(result);
    }
  };

  const handleProfessionalTax = () => {
    if (declaredPTax && verifiedPTax) {
      const result = calculateProfessionalTax({
        declaredAmount: parseFloat(declaredPTax),
        verifiedAmount: parseFloat(verifiedPTax),
      });
      setPtaxResult(result);
    }
  };

  const handleOpeningBalance = () => {
    if (bookBalance && auditedBalance) {
      const result = calculateOpeningBalance({
        bookBalance: parseFloat(bookBalance),
        auditedBalance: parseFloat(auditedBalance),
      });
      setBalanceResult(result);
    }
  };

  const handleBankVouching = () => {
    if (bankStatement && cashBook) {
      const result = calculateBankVouching({
        bankStatement: parseFloat(bankStatement),
        cashBook: parseFloat(cashBook),
      });
      setBankResult(result);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "compliant":
      case "matched":
      case "low":
        return <CheckCircle className="h-4 w-4 text-audit-success" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-audit-warning" />;
      case "high":
      case "non-compliant":
      case "variance detected":
        return <XCircle className="h-4 w-4 text-audit-error" />;
      default:
        return <Info className="h-4 w-4 text-audit-info" />;
    }
  };

  const getStatusBadge = (
    status: string,
    type: "success" | "warning" | "error" | "info" = "info",
  ) => {
    const variants = {
      success: "bg-audit-success/10 text-audit-success border-audit-success/20",
      warning: "bg-audit-warning/10 text-audit-warning border-audit-warning/20",
      error: "bg-audit-error/10 text-audit-error border-audit-error/20",
      info: "bg-audit-info/10 text-audit-info border-audit-info/20",
    };

    return (
      <Badge variant="outline" className={variants[type]}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Audit Pro Dashboard
              </h1>
              <p className="text-muted-foreground">
                Professional Auditing Tools & Financial Verification Suite
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Tool 1: Tax Audit Verification */}
          <Card className="col-span-full lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Tax Audit Verification
                  </CardTitle>
                  <CardDescription>
                    Verify tax calculations and compliance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Taxable Income (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter taxable income"
                  value={taxIncome}
                  onChange={(e) => setTaxIncome(e.target.value)}
                />
              </div>
              <Button onClick={handleTaxAudit} className="w-full" size="sm">
                Calculate Tax
              </Button>

              {taxResult && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Compliance Status:
                    </span>
                    {getStatusBadge(
                      taxResult.compliance,
                      taxResult.compliance === "Compliant"
                        ? "success"
                        : "error",
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tax Rate:</span>
                      <p className="font-medium">{taxResult.taxRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Calculated Tax:
                      </span>
                      <p className="font-medium">
                        ₹{taxResult.calculatedTax.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Recommendations:
                    </span>
                    <ul className="mt-1 space-y-1">
                      {taxResult.recommendations
                        .slice(0, 2)
                        .map((rec, index) => (
                          <li
                            key={index}
                            className="text-xs text-muted-foreground flex items-start"
                          >
                            <span className="mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool 2: Salary Reconciliation */}
          <Card className="col-span-full lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Salary Reconciliation
                  </CardTitle>
                  <CardDescription>
                    Compare reported vs actual salary
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reported Salary (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter reported salary"
                  value={reportedSalary}
                  onChange={(e) => setReportedSalary(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Actual Salary (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter actual salary"
                  value={actualSalary}
                  onChange={(e) => setActualSalary(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSalaryReconciliation}
                className="w-full"
                size="sm"
              >
                Reconcile Salary
              </Button>

              {salaryResult && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    {getStatusBadge(
                      salaryResult.status,
                      salaryResult.status === "Matched" ? "success" : "warning",
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Variance:</span>
                      <p
                        className={`font-medium ${salaryResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        ₹{Math.abs(salaryResult.variance).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variance %:</span>
                      <p
                        className={`font-medium ${salaryResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {Math.abs(salaryResult.variancePercentage)}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Analysis:
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {salaryResult.comments}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool 3: Professional Tax Reconciliation */}
          <Card className="col-span-full lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-audit-warning/10">
                  <Scale className="h-5 w-5 text-audit-warning" />
                </div>
                <div>
                  <CardTitle className="text-lg">Professional Tax</CardTitle>
                  <CardDescription>
                    Reconcile professional tax declarations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Declared Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter declared amount"
                  value={declaredPTax}
                  onChange={(e) => setDeclaredPTax(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Verified Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter verified amount"
                  value={verifiedPTax}
                  onChange={(e) => setVerifiedPTax(e.target.value)}
                />
              </div>
              <Button
                onClick={handleProfessionalTax}
                className="w-full"
                size="sm"
              >
                Verify P-Tax
              </Button>

              {ptaxResult && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compliance:</span>
                    {getStatusBadge(
                      ptaxResult.complianceStatus,
                      ptaxResult.complianceStatus === "Compliant"
                        ? "success"
                        : ptaxResult.complianceStatus === "Under-declared"
                          ? "error"
                          : "warning",
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Difference:</span>
                      <p
                        className={`font-medium ${ptaxResult.difference >= 0 ? "text-audit-error" : "text-audit-success"}`}
                      >
                        ₹{Math.abs(ptaxResult.difference).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Penalty:</span>
                      <p
                        className={`font-medium ${ptaxResult.penaltyApplicable ? "text-audit-error" : "text-audit-success"}`}
                      >
                        {ptaxResult.penaltyApplicable ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Action Required:
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ptaxResult.recommendedAction}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool 4: Opening Balance Verification */}
          <Card className="col-span-full lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-audit-info/10">
                  <Scale className="h-5 w-5 text-audit-info" />
                </div>
                <div>
                  <CardTitle className="text-lg">Opening Balance</CardTitle>
                  <CardDescription>
                    Verify opening balance accuracy
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Book Balance (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter book balance"
                  value={bookBalance}
                  onChange={(e) => setBookBalance(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Audited Balance (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter audited balance"
                  value={auditedBalance}
                  onChange={(e) => setAuditedBalance(e.target.value)}
                />
              </div>
              <Button
                onClick={handleOpeningBalance}
                className="w-full"
                size="sm"
              >
                Verify Balance
              </Button>

              {balanceResult && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Risk Level:</span>
                    {getStatusBadge(
                      balanceResult.riskLevel,
                      balanceResult.riskLevel === "Low"
                        ? "success"
                        : balanceResult.riskLevel === "Medium"
                          ? "warning"
                          : "error",
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Variance:</span>
                      <p
                        className={`font-medium ${balanceResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        ₹{Math.abs(balanceResult.variance).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Material:</span>
                      <p
                        className={`font-medium ${balanceResult.isMaterial ? "text-audit-error" : "text-audit-success"}`}
                      >
                        {balanceResult.isMaterial ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Adjustment Entry:
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {balanceResult.adjustmentEntry}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool 5: Bank Vouching */}
          <Card className="col-span-full lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-audit-success/10">
                  <CreditCard className="h-5 w-5 text-audit-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Bank Vouching</CardTitle>
                  <CardDescription>
                    Reconcile bank statement with cash book
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Bank Statement Balance (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter bank statement balance"
                    value={bankStatement}
                    onChange={(e) => setBankStatement(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Cash Book Balance (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter cash book balance"
                    value={cashBook}
                    onChange={(e) => setCashBook(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleBankVouching} className="w-full" size="sm">
                Perform Bank Vouching
              </Button>

              {bankResult && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Risk Assessment:
                    </span>
                    {getStatusBadge(
                      bankResult.riskAssessment,
                      bankResult.riskAssessment === "Low"
                        ? "success"
                        : bankResult.riskAssessment === "Medium"
                          ? "warning"
                          : "error",
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Difference:</span>
                      <p
                        className={`font-medium ${bankResult.difference >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        ₹{Math.abs(bankResult.difference).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Reconciliation:
                      </span>
                      <p
                        className={`font-medium ${bankResult.reconciliationRequired ? "text-audit-warning" : "text-audit-success"}`}
                      >
                        {bankResult.reconciliationRequired
                          ? "Required"
                          : "Not Required"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p
                        className={`font-medium ${bankResult.reconciliationRequired ? "text-audit-warning" : "text-audit-success"}`}
                      >
                        {bankResult.reconciliationRequired
                          ? "Needs Review"
                          : "Balanced"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Possible Causes:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {bankResult.possibleCauses
                          .slice(0, 3)
                          .map((cause, index) => (
                            <li
                              key={index}
                              className="text-xs text-muted-foreground flex items-start"
                            >
                              <span className="mr-2">•</span>
                              {cause}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Next Steps:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {bankResult.nextSteps.slice(0, 3).map((step, index) => (
                          <li
                            key={index}
                            className="text-xs text-muted-foreground flex items-start"
                          >
                            <span className="mr-2">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            Audit Pro Dashboard - Professional Financial Analysis & Verification
            Tools
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Always consult with qualified professionals for official audit
            procedures
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
