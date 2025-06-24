import React from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  TrendingUp,
  Shield,
  Scale,
  CreditCard,
  ArrowRight,
  FileText,
  Upload,
} from "lucide-react";

const Index = () => {
  const auditTools = [
    {
      id: "tax-audit",
      title: "Tax Audit Verification",
      description:
        "Upload and analyze tax documents for compliance verification",
      longDescription:
        "Comprehensive tax calculation verification with compliance checking, risk assessment, and actionable recommendations for tax optimization.",
      icon: Calculator,
      color: "bg-primary/10",
      iconColor: "text-primary",
      route: "/tax-audit",
      features: [
        "Progressive Tax Calculation",
        "Compliance Checking",
        "Risk Assessment",
        "Document Analysis",
      ],
      acceptedDocs: ["Cash Flow Statement", "Cash book statement"],
    },
    {
      id: "salary-reconciliation",
      title: "Salary Reconciliation",
      description: "Compare and reconcile reported vs actual salary data",
      longDescription:
        "Advanced salary variance analysis with detailed reconciliation reports, adjustment recommendations, and compliance verification.",
      icon: TrendingUp,
      color: "bg-secondary/10",
      iconColor: "text-secondary",
      route: "/salary-reconciliation",
      features: [
        "Variance Analysis",
        "Adjustment Detection",
        "Compliance Review",
        "Detailed Reporting",
      ],
      acceptedDocs: ["Salary Registers", "Salary Ledgers"],
    },
    {
      id: "professional-tax",
      title: "Professional Tax Reconciliation",
      description: "Verify professional tax declarations and payments",
      longDescription:
        "Professional tax compliance verification with penalty assessment, payment tracking, and regulatory compliance monitoring.",
      icon: Scale,
      color: "bg-audit-warning/10",
      iconColor: "text-audit-warning",
      route: "/professional-tax",
      features: [
        "Declaration Verification",
        "Penalty Assessment",
        "Payment Tracking",
        "Compliance Monitoring",
      ],
      acceptedDocs: [
        "Salary Ledgers",
        "Salary Registers",
        "Pt Challans",
        "Pt registers",
      ],
    },
    {
      id: "opening-balance",
      title: "Opening Balance Verification",
      description: "Verify accuracy of opening balance figures",
      longDescription:
        "Comprehensive balance verification with materiality assessment, variance analysis, and adjustment entry generation.",
      icon: Scale,
      color: "bg-audit-info/10",
      iconColor: "text-audit-info",
      route: "/opening-balance",
      features: [
        "Materiality Assessment",
        "Variance Analysis",
        "Risk Evaluation",
        "Adjustment Entries",
      ],
      acceptedDocs: ["Trial Balance", "Balance"],
    },
    {
      id: "bank-vouching",
      title: "Bank Vouching",
      description: "Reconcile bank statements with cash book records",
      longDescription:
        "Advanced bank reconciliation with automated vouching, discrepancy identification, and comprehensive audit trail.",
      icon: CreditCard,
      color: "bg-audit-success/10",
      iconColor: "text-audit-success",
      route: "/bank-vouching",
      features: [
        "Automated Reconciliation",
        "Discrepancy Detection",
        "Risk Assessment",
        "Audit Trail",
      ],
      acceptedDocs: [
        "Bank Statements",
        "Cash Books",
        "Passbooks",
        "Journal Entries",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Audit Pro Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Professional Auditing Tools & Financial Verification Suite
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-primary/5">
                <FileText className="h-3 w-3 mr-1" />
                PDF Analysis
              </Badge>
              <Badge variant="outline" className="bg-secondary/5">
                <Upload className="h-3 w-3 mr-1" />
                Drag & Drop
              </Badge>
              <Badge variant="outline" className="bg-audit-success/5">
                AI-Powered
              </Badge>
              <Badge variant="outline" className="bg-audit-info/5">
                Instant Results
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tools Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {auditTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card
                key={tool.id}
                className="group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-6 w-6 ${tool.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Long Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.longDescription}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-foreground">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accepted Documents */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-foreground">
                      Accepted Documents
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {tool.acceptedDocs.map((doc, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs px-2 py-1"
                        >
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={tool.route} className="block">
                    <Button
                      className="w-full group-hover:bg-primary/90 transition-colors"
                      size="lg"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Start Analysis
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <Separator className="mb-12" />
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Audit Pro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade auditing tools designed for accuracy,
              compliance, and efficiency
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Document Processing</h3>
              <p className="text-sm text-muted-foreground">
                Advanced PDF and image analysis with OCR technology for accurate
                data extraction
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mx-auto">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">Compliance Checking</h3>
              <p className="text-sm text-muted-foreground">
                Automated compliance verification against regulatory standards
                and audit requirements
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-audit-success/10 mx-auto">
                <TrendingUp className="h-8 w-8 text-audit-success" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Instant results with detailed variance analysis and risk
                assessment
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-audit-info/10 mx-auto">
                <Scale className="h-8 w-8 text-audit-info" />
              </div>
              <h3 className="text-lg font-semibold">Professional Reports</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive audit reports with actionable recommendations and
                findings
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <Separator className="mb-8" />
          <p className="text-sm text-muted-foreground mb-2">
            Audit Pro Dashboard - Professional Financial Analysis & Verification
            Tools
          </p>
          <p className="text-xs text-muted-foreground">
            Always consult with qualified professionals for official audit
            procedures
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
