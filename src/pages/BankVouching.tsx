import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload";
import {
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
} from "lucide-react";
import {
  calculateBankVouching,
  type BankVouchingResult,
} from "@/lib/audit-calculations";

const BankVouching = () => {
  const [bankStatementDocs, setBankStatementDocs] = useState<UploadedFile[]>(
    [],
  );
  const [cashBookDocs, setCashBookDocs] = useState<UploadedFile[]>([]);
  const [bankResult, setBankResult] = useState<BankVouchingResult | null>(null);
  const [bankProcessing, setBankProcessing] = useState(false);

  const handleBankVouching = async () => {
    if (bankStatementDocs.length === 0 || cashBookDocs.length === 0) return;

    setBankProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Extract mock data for calculation
    const result = calculateBankVouching({
      bankStatement: 1250000, // Mock extracted value
      cashBook: 1245000, // Mock extracted value
    });
    setBankResult(result);
    setBankProcessing(false);
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

    const icons = {
      success: <CheckCircle className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      error: <XCircle className="h-4 w-4" />,
      info: <CheckCircle className="h-4 w-4" />,
    };

    return (
      <Badge variant="outline" className={variants[type]}>
        {icons[type]}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audit-success/10">
                <CreditCard className="h-6 w-6 text-audit-success" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Bank Vouching
                </h1>
                <p className="text-muted-foreground">
                  Reconcile bank statements with cash book records for audit
                  verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Upload
              </CardTitle>
              <CardDescription>
                Upload bank and cash book documents for comprehensive vouching
                and reconciliation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                id="bank-statement-docs"
                label="Bank Statement Documents"
                description="Upload bank statements, passbooks, e-statements"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={5}
                maxSize={10}
                onFilesChange={setBankStatementDocs}
              />
              <FileUpload
                id="cash-book-docs"
                label="Cash Book Documents"
                description="Upload cash books, journals, ledger entries"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={5}
                maxSize={10}
                onFilesChange={setCashBookDocs}
              />
              <Button
                onClick={handleBankVouching}
                className="w-full"
                size="lg"
                disabled={
                  bankStatementDocs.length === 0 ||
                  cashBookDocs.length === 0 ||
                  bankProcessing
                }
              >
                {bankProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Documents...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Perform Bank Vouching
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Vouching Results
              </CardTitle>
              <CardDescription>
                Bank reconciliation analysis and risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bankResult ? (
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
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

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Bank Statement Balance
                      </label>
                      <p className="text-2xl font-bold">
                        ₹{bankResult.bankStatement.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Cash Book Balance
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        ₹{bankResult.cashBook.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Difference
                      </label>
                      <p
                        className={`text-2xl font-bold ${bankResult.difference >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {bankResult.difference >= 0 ? "+" : ""}₹
                        {Math.abs(bankResult.difference).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Reconciliation Status
                      </label>
                      <Badge
                        variant={
                          bankResult.reconciliationRequired
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {bankResult.reconciliationRequired
                          ? "Required"
                          : "Balanced"}
                      </Badge>
                    </div>
                  </div>

                  {/* Reconciliation Status */}
                  {bankResult.reconciliationRequired && (
                    <div className="p-4 bg-audit-warning/20 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        Reconciliation Required
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Differences identified between bank statement and cash
                        book. Review required for complete reconciliation.
                      </p>
                    </div>
                  )}

                  {/* Possible Causes */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Possible Causes</h3>
                    <div className="space-y-2">
                      {bankResult.possibleCauses.map((cause, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-audit-info rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">{cause}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Recommended Next Steps
                    </h3>
                    <div className="space-y-2">
                      {bankResult.nextSteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-audit-success/20 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-audit-success rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Mitigation */}
                  {bankResult.riskAssessment !== "Low" && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Risk Mitigation</h3>
                      <div className="space-y-2">
                        {bankResult.riskAssessment === "High" && (
                          <>
                            <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                              <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm">
                                Immediate attention required due to high risk
                                level
                              </p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                              <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm">
                                Consider extended procedures for bank
                                confirmations
                              </p>
                            </div>
                          </>
                        )}
                        {bankResult.riskAssessment === "Medium" && (
                          <div className="flex items-start gap-3 p-3 bg-audit-warning/20 rounded-lg">
                            <div className="w-2 h-2 bg-audit-warning rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm">
                              Enhanced review procedures recommended
                            </p>
                          </div>
                        )}
                        <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-info rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Document all reconciling items with supporting
                            evidence
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload bank and cash book documents to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BankVouching;
