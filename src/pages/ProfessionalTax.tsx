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
  calculateProfessionalTax,
  type ProfessionalTaxResult,
} from "@/lib/audit-calculations";

const ProfessionalTax = () => {
  const [declaredPTaxDocs, setDeclaredPTaxDocs] = useState<UploadedFile[]>([]);
  const [verifiedPTaxDocs, setVerifiedPTaxDocs] = useState<UploadedFile[]>([]);
  const [ptaxResult, setPtaxResult] = useState<ProfessionalTaxResult | null>(
    null,
  );
  const [ptaxProcessing, setPtaxProcessing] = useState(false);

  const handleProfessionalTax = async () => {
    if (declaredPTaxDocs.length === 0 || verifiedPTaxDocs.length === 0) return;

    setPtaxProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Extract mock data for calculation
    const result = calculateProfessionalTax({
      declaredAmount: 18000, // Mock extracted value
      verifiedAmount: 20000, // Mock extracted value
    });
    setPtaxResult(result);
    setPtaxProcessing(false);
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audit-warning/10">
                <Scale className="h-6 w-6 text-audit-warning" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Professional Tax Reconciliation
                </h1>
                <p className="text-muted-foreground">
                  Verify professional tax declarations and payments
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
                Upload professional tax documents for declaration and payment
                verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                id="declared-ptax-docs"
                label="Declared Professional Tax Documents"
                description="Upload P-Tax declarations, forms, certificates"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setDeclaredPTaxDocs}
              />
              <FileUpload
                id="verified-ptax-docs"
                label="Verified Professional Tax Documents"
                description="Upload payment receipts, challans, bank statements"
                accept=".pdf,.png,.jpg,.jpeg"
                maxFiles={3}
                maxSize={10}
                onFilesChange={setVerifiedPTaxDocs}
              />
              <Button
                onClick={handleProfessionalTax}
                className="w-full"
                size="lg"
                disabled={
                  declaredPTaxDocs.length === 0 ||
                  verifiedPTaxDocs.length === 0 ||
                  ptaxProcessing
                }
              >
                {ptaxProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Documents...
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4 mr-2" />
                    Verify P-Tax Documents
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
                Professional tax compliance analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ptaxResult ? (
                <div className="space-y-6">
                  {/* Compliance Status */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">
                      Compliance Status:
                    </span>
                    {getStatusBadge(
                      ptaxResult.complianceStatus,
                      ptaxResult.complianceStatus === "Compliant"
                        ? "success"
                        : ptaxResult.complianceStatus === "Under-declared"
                          ? "error"
                          : "warning",
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Declared Amount
                      </label>
                      <p className="text-2xl font-bold">
                        ₹{ptaxResult.declaredAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Verified Amount
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        ₹{ptaxResult.verifiedAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Difference
                      </label>
                      <p
                        className={`text-2xl font-bold ${ptaxResult.difference >= 0 ? "text-audit-error" : "text-audit-success"}`}
                      >
                        {ptaxResult.difference >= 0 ? "+" : ""}₹
                        {Math.abs(ptaxResult.difference).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Penalty Applicable
                      </label>
                      <p
                        className={`text-2xl font-bold ${ptaxResult.penaltyApplicable ? "text-audit-error" : "text-audit-success"}`}
                      >
                        {ptaxResult.penaltyApplicable ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* Compliance Details */}
                  {ptaxResult.complianceStatus !== "Compliant" && (
                    <div className="p-4 bg-accent/20 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        Compliance Issue
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {ptaxResult.complianceStatus === "Under-declared"
                          ? "Professional tax has been under-declared. Additional payment required."
                          : "Professional tax has been over-declared. Refund may be applicable."}
                      </p>
                    </div>
                  )}

                  {/* Recommended Action */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Recommended Action
                    </h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{ptaxResult.recommendedAction}</p>
                    </div>
                  </div>

                  {/* Additional Recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Additional Recommendations
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-warning rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Maintain proper documentation of all professional tax
                          payments
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-warning rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Ensure timely filing of professional tax returns
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-2 h-2 bg-audit-warning rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">
                          Review professional tax rates for accuracy in future
                          declarations
                        </p>
                      </div>
                      {ptaxResult.penaltyApplicable && (
                        <div className="flex items-start gap-3 p-3 bg-audit-error/20 rounded-lg">
                          <div className="w-2 h-2 bg-audit-error rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">
                            Consult with tax advisor regarding penalty
                            mitigation options
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Upload professional tax documents to see verification
                    results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTax;
