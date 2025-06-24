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
  Scale,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
} from "lucide-react";
import {
  calculateOpeningBalance,
  type OpeningBalanceResult,
} from "@/lib/audit-calculations";

const OpeningBalance = () => {
  const [bookBalanceDocs, setBookBalanceDocs] = useState<UploadedFile[]>([]);
  const [auditedBalanceDocs, setAuditedBalanceDocs] = useState<UploadedFile[]>(
    [],
  );
  const [balanceResult, setBalanceResult] =
    useState<OpeningBalanceResult | null>(null);
  const [balanceProcessing, setBalanceProcessing] = useState(false);

  const handleOpeningBalance = async () => {
    if (bookBalanceDocs.length === 0 || auditedBalanceDocs.length === 0) return;

    setBalanceProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Extract mock data for calculation
    const result = calculateOpeningBalance({
      bookBalance: 2500000, // Mock extracted value
      auditedBalance: 2485000, // Mock extracted value
    });
    setBalanceResult(result);
    setBalanceProcessing(false);
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audit-info/10">
                <Scale className="h-6 w-6 text-audit-info" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Opening Balance Verification
                </h1>
                <p className="text-muted-foreground">
                  Verify accuracy of opening balance figures and identify
                  variances
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
                Upload balance documents for comprehensive verification and
                materiality assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                id="book-balance-docs"
                label="Book Balance Documents"
                description="Upload ledgers, trial balance, accounting records"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setBookBalanceDocs}
              />
              <FileUpload
                id="audited-balance-docs"
                label="Audited Balance Documents"
                description="Upload audit reports, confirmations, external verifications"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setAuditedBalanceDocs}
              />
              <Button
                onClick={handleOpeningBalance}
                className="w-full"
                size="lg"
                disabled={
                  bookBalanceDocs.length === 0 ||
                  auditedBalanceDocs.length === 0 ||
                  balanceProcessing
                }
              >
                {balanceProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Documents...
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4 mr-2" />
                    Verify Balance Documents
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
                Verification Results
              </CardTitle>
              <CardDescription>
                Balance variance analysis and materiality assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {balanceResult ? (
                <div className="space-y-6">
                  {/* Risk Level */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
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

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Book Balance
                      </label>
                      <p className="text-2xl font-bold">
                        ₹{balanceResult.bookBalance.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Audited Balance
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        ₹{balanceResult.auditedBalance.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Variance Amount
                      </label>
                      <p
                        className={`text-2xl font-bold ${balanceResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {balanceResult.variance >= 0 ? "+" : ""}₹
                        {Math.abs(balanceResult.variance).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Variance Percentage
                      </label>
                      <p
                        className={`text-2xl font-bold ${balanceResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {balanceResult.variance >= 0 ? "+" : ""}
                        {balanceResult.variancePercentage}%
                      </p>
                    </div>
                  </div>

                  {/* Materiality Assessment */}
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Materiality Threshold
                        </label>
                        <p className="text-lg font-semibold">
                          ₹{balanceResult.materialityThreshold.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Material Variance
                        </label>
                        <Badge
                          variant={
                            balanceResult.isMaterial
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {balanceResult.isMaterial ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Adjustment Entry */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Adjustment Entry</h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm font-mono">
                        {balanceResult.adjustmentEntry}
                      </p>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  {balanceResult.isMaterial && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Risk Analysis</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Material variance detected requiring immediate
                            attention
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Review supporting documentation for variance
                            explanation
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Consider impact on financial statement assertions
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Recommendations</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-info rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Perform detailed reconciliation of opening balances
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-info rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Verify cut-off procedures for year-end transactions
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-info rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Document explanation for variance in audit working
                          papers
                        </p>
                      </div>
                      {!balanceResult.isMaterial && (
                        <div className="flex items-start gap-3 p-3 bg-audit-success/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-success rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Variance is within acceptable materiality limits
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload balance documents to see verification results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpeningBalance;
