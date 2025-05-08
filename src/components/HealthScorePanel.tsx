
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge, ChartBar, Eye } from "lucide-react";

interface HealthCategoryScore {
  name: string;
  score: number;
  status: 'normal' | 'warning' | 'danger';
  icon: React.ReactNode;
}

const HealthScorePanel: React.FC = () => {
  // This would be calculated based on actual lab data in a real application
  const overallScore = 82;
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-medical-success';
    if (score >= 60) return 'text-medical-warning';
    return 'text-medical-danger';
  };
  
  const getScoreBorder = (score: number) => {
    if (score >= 80) return 'health-score-normal';
    if (score >= 60) return 'health-score-warning';
    return 'health-score-danger';
  };
  
  const categories: HealthCategoryScore[] = [
    {
      name: 'Blood Health',
      score: 90,
      status: 'normal',
      icon: <ChartBar className="h-5 w-5" />
    },
    {
      name: 'Metabolic Health',
      score: 75,
      status: 'warning',
      icon: <ChartBar className="h-5 w-5" />
    },
    {
      name: 'Inflammation Markers',
      score: 85,
      status: 'normal',
      icon: <ChartBar className="h-5 w-5" />
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Gauge className="h-5 w-5 text-medical-primary" />
            Health Score
          </CardTitle>
        </div>
        <CardDescription>AI-powered analysis of your lab results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
          <div className={`health-score-gauge ${getScoreBorder(overallScore)}`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="text-base font-semibold text-medical-dark mb-2">Health Categories</div>
            {categories.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <span className={getScoreColor(category.score)}>{category.score}%</span>
                </div>
                <Progress 
                  value={category.score} 
                  className={`h-2 ${
                    category.status === 'normal' 
                      ? 'bg-gray-100' 
                      : category.status === 'warning' 
                        ? 'bg-medical-warning/20' 
                        : 'bg-medical-danger/20'
                  }`}
                  indicatorClassName={
                    category.status === 'normal'
                      ? 'bg-medical-success'
                      : category.status === 'warning'
                        ? 'bg-medical-warning'
                        : 'bg-medical-danger'
                  }
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-medical-light/30 border-none">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-medical-secondary">Tests Reviewed</div>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card className="bg-medical-light/30 border-none">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-medical-secondary">Abnormal Values</div>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="bg-medical-light/30 border-none">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-medical-secondary">Health Insights</div>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScorePanel;
