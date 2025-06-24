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
  Calculator,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  FileText,
} from "lucide-react";
import {
  calculateTaxAudit,
  type TaxAuditResult,
} from "@/lib/audit-calculations";

const TaxAudit = () => {
  const [taxDocuments, setTaxDocuments] = useState<UploadedFile[]>([]);
  const [taxResult, setTaxResult] = useState<TaxAuditResult | null>(null);
  const [taxProcessing, setTaxProcessing] = useState(false);

  const handleTaxAudit = async () => {
    if (taxDocuments.length === 0) return;

    setTaxProcessing(true);
    // Simulate document processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Extract mock data for calculation
    const result = calculateTaxAudit({
      taxableIncome: 850000, // Mock extracted value
    });
    setTaxResult(result);
    setTaxProcessing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-audit-success" />;
      case "non-compliant":
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
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Tax Audit Verification
                </h1>
                <p className="text-muted-foreground">
                  Upload and analyze tax documents for compliance verification
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
                Upload your tax documents for automated verification and
                compliance checking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                id="tax-documents"
                label="Tax Documents"
                description="Upload Form 16, ITR, TDS certificates, or other tax documents"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={5}
                maxSize={10}
                onFilesChange={setTaxDocuments}
              />
              <Button
                onClick={handleTaxAudit}
                className="w-full"
                size="lg"
                disabled={taxDocuments.length === 0 || taxProcessing}
              >
                {taxProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Documents...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    Analyze Tax Documents
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
                Tax compliance analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {taxResult ? (
                <div className="space-y-6">
                  {/* Compliance Status */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
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

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Taxable Income
                      </label>
                      <p className="text-2xl font-bold">
                        ₹{taxResult.taxableIncome.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Tax Rate
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        {taxResult.taxRate}%
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Calculated Tax
                      </label>
                      <p className="text-2xl font-bold text-secondary">
                        ₹{taxResult.calculatedTax.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Discrepancy
                      </label>
                      <p
                        className={`text-2xl font-bold ${taxResult.discrepancy === 0 ? "text-audit-success" : "text-audit-error"}`}
                      >
                        ₹{taxResult.discrepancy.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Recommendations</h3>
                    <div className="space-y-2">
                      {taxResult.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload tax documents to see verification results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxAudit;
