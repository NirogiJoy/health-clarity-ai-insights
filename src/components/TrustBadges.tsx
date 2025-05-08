
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";
import { Separator } from '@/components/ui/separator';

const TrustBadges: React.FC = () => {
  return (
    <div className="space-y-4">
      <Alert className="border-medical-light bg-medical-light/10">
        <ShieldCheck className="h-4 w-4 text-medical-primary" />
        <AlertDescription className="text-xs text-gray-600">
          This tool provides informational analysis only and is not a substitute for professional medical advice. Always consult with healthcare providers regarding medical conditions.
        </AlertDescription>
      </Alert>
      
      <Card className="bg-white">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <ShieldCheck className="h-4 w-4 text-medical-primary" />
              <span className="text-xs font-medium">HIPAA Compliant</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <ShieldCheck className="h-4 w-4 text-medical-primary" />
              <span className="text-xs font-medium">256-bit Encryption</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <ShieldCheck className="h-4 w-4 text-medical-primary" />
              <span className="text-xs font-medium">AI Ethics Certified</span>
            </div>
          </div>
          
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          
          <div className="text-center sm:text-right">
            <div className="text-xs text-gray-500">Reviewed by</div>
            <div className="text-sm font-medium">Clinical Advisory Board</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustBadges;
