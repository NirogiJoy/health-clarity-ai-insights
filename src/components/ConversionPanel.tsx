
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ClipboardCheck } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const ConversionPanel: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the report",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Sent Successfully",
        description: "Check your email for your detailed health report",
      });
      setEmail("");
    }, 1500);
  };

  const features = [
    {
      name: "Basic Report",
      free: true,
      premium: true,
    },
    {
      name: "Test Visualization",
      free: true,
      premium: true,
    },
    {
      name: "Data Editing",
      free: true,
      premium: true,
    },
    {
      name: "AI Health Score",
      free: false,
      premium: true,
    },
    {
      name: "Detailed Insights",
      free: false,
      premium: true,
    },
    {
      name: "Trend Analysis",
      free: false,
      premium: true,
    },
    {
      name: "Lifestyle Recommendations",
      free: false,
      premium: true,
    }
  ];

  return (
    <Card className="border-medical-primary/20">
      <CardHeader className="bg-gradient-to-r from-medical-primary/10 to-medical-light/20">
        <CardTitle>Get Your Full Health Report</CardTitle>
        <CardDescription>Receive a comprehensive analysis with actionable insights</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-medical-primary hover:bg-medical-secondary flex gap-2"
              disabled={isSubmitting}
            >
              <ClipboardCheck className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Report"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="text-sm font-medium mb-3">Available Features:</div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 text-sm font-medium">
              <div>Feature</div>
              <div className="text-center">Free</div>
              <div className="text-center">Premium</div>
            </div>
            <Separator />
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-3 text-sm items-center py-1">
                <div>{feature.name}</div>
                <div className="text-center">
                  {feature.free ? (
                    <Check className="h-4 w-4 text-medical-success mx-auto" />
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
                <div className="text-center">
                  {feature.premium && (
                    <Check className="h-4 w-4 text-medical-primary mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Your data is encrypted and never shared
        </div>
        <div className="text-xs font-medium text-medical-primary">
          Limited Time: 7-day Premium Trial
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConversionPanel;
