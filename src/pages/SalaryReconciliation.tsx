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
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileText,
} from "lucide-react";
import {
  calculateSalaryReconciliation,
  type SalaryReconciliationResult,
} from "@/lib/audit-calculations";

const SalaryReconciliation = () => {
  const [reportedSalaryDocs, setReportedSalaryDocs] = useState<UploadedFile[]>(
    [],
  );
  const [actualSalaryDocs, setActualSalaryDocs] = useState<UploadedFile[]>([]);
  const [salaryResult, setSalaryResult] =
    useState<SalaryReconciliationResult | null>(null);
  const [salaryProcessing, setSalaryProcessing] = useState(false);

  const handleSalaryReconciliation = async () => {
    if (reportedSalaryDocs.length === 0 || actualSalaryDocs.length === 0)
      return;

    setSalaryProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Extract mock data for calculation
    const result = calculateSalaryReconciliation({
      reportedSalary: 750000, // Mock extracted value
      actualSalary: 780000, // Mock extracted value
    });
    setSalaryResult(result);
    setSalaryProcessing(false);
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
      error: <AlertTriangle className="h-4 w-4" />,
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Salary Reconciliation
                </h1>
                <p className="text-muted-foreground">
                  Compare and reconcile reported vs actual salary data
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
                Upload salary documents for comprehensive reconciliation
                analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                id="reported-salary-docs"
                label="Reported Salary Documents"
                description="Upload payslips, salary certificates, HR records"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setReportedSalaryDocs}
              />
              <FileUpload
                id="actual-salary-docs"
                label="Actual Salary Documents"
                description="Upload bank statements, payment receipts, actual disbursements"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setActualSalaryDocs}
              />
              <Button
                onClick={handleSalaryReconciliation}
                className="w-full"
                size="lg"
                disabled={
                  reportedSalaryDocs.length === 0 ||
                  actualSalaryDocs.length === 0 ||
                  salaryProcessing
                }
              >
                {salaryProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Documents...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Reconcile Salary Documents
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
                Reconciliation Results
              </CardTitle>
              <CardDescription>
                Salary variance analysis and reconciliation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {salaryResult ? (
                <div className="space-y-6">
                  {/* Status */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">
                      Reconciliation Status:
                    </span>
                    {getStatusBadge(
                      salaryResult.status,
                      salaryResult.status === "Matched" ? "success" : "warning",
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Reported Salary
                      </label>
                      <p className="text-2xl font-bold">
                        ₹{salaryResult.reportedSalary.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Actual Salary
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        ₹{salaryResult.actualSalary.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Variance Amount
                      </label>
                      <p
                        className={`text-2xl font-bold ${salaryResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {salaryResult.variance >= 0 ? "+" : ""}₹
                        {Math.abs(salaryResult.variance).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Variance Percentage
                      </label>
                      <p
                        className={`text-2xl font-bold ${salaryResult.variance >= 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        {salaryResult.variance >= 0 ? "+" : ""}
                        {salaryResult.variancePercentage}%
                      </p>
                    </div>
                  </div>

                  {/* Adjustment Required */}
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Adjustment Required:
                      </span>
                      <Badge
                        variant={
                          salaryResult.adjustmentRequired
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {salaryResult.adjustmentRequired ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>

                  {/* Analysis Comments */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Analysis</h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{salaryResult.comments}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {salaryResult.adjustmentRequired && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Recommendations</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Review additional salary components not captured in
                            initial reporting
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Verify timing differences between accrual and
                            payment
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Document explanation for variance in audit working
                            papers
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload salary documents to see reconciliation results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalaryReconciliation;
