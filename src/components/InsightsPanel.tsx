
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Share, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const InsightsPanel: React.FC = () => {
  const insights = [
    {
      title: "Red Blood Cell Count Elevated",
      description: "Your RBC count is slightly elevated at 5.77 x10^12/L (normal range: 4.5-5.5). This could be due to dehydration, lung disease, or living at high altitude.",
      category: "Blood Health",
      severity: "low",
    },
    {
      title: "Low Platelet Count",
      description: "Your platelet count is below normal at 145 x10^9/L (normal range: 150-450). This could potentially affect blood clotting. Consider following up with your healthcare provider.",
      category: "Blood Health",
      severity: "medium",
    },
    {
      title: "Normal Hemoglobin Levels",
      description: "Your hemoglobin is within normal range at 15.6 g/dL, indicating good oxygen-carrying capacity in your blood.",
      category: "Blood Health",
      severity: "none",
    }
  ];
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'text-medical-danger';
      case 'medium': return 'text-medical-warning';
      case 'low': return 'text-amber-500';
      default: return 'text-medical-success';
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-medical-danger/10 text-medical-danger';
      case 'medium': return 'bg-medical-warning/10 text-medical-warning';
      case 'low': return 'bg-amber-500/10 text-amber-500';
      default: return 'bg-medical-success/10 text-medical-success';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-medical-primary" />
          Personalized Insights
        </CardTitle>
        <CardDescription>AI-powered interpretations of your lab results in plain language</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <React.Fragment key={index}>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className={`font-medium ${getSeverityColor(insight.severity)}`}>{insight.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBadge(insight.severity)}`}>
                  {insight.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
              {insight.severity !== 'none' && (
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Eye className="h-3 w-3" />
                  <span>Recommended action: Consult with healthcare provider</span>
                </div>
              )}
            </div>
            {index < insights.length - 1 && <Separator className="my-3" />}
          </React.Fragment>
        ))}
        
        <div className="pt-4">
          <Card className="bg-medical-light/30 border-none">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-medium text-medical-primary">Get Your Complete Smart Report</h4>
                  <p className="text-sm text-gray-600">Receive a detailed PDF with all insights and recommendations</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button size="sm" className="gap-2 bg-medical-primary hover:bg-medical-secondary">
                    <ClipboardCheck className="h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
