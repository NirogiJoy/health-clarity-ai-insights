
import React from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-8 w-8 text-medical-primary" />
          <span className="text-xl font-semibold text-medical-dark">Health Clarity</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-medical-neutral hover:text-medical-primary transition-colors">How It Works</a>
          <a href="#" className="text-medical-neutral hover:text-medical-primary transition-colors">Features</a>
          <a href="#" className="text-medical-neutral hover:text-medical-primary transition-colors">Pricing</a>
          <a href="#" className="text-medical-neutral hover:text-medical-primary transition-colors">About Us</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex gap-2">
            <FileText className="h-4 w-4" />
            Sample Report
          </Button>
          <Button className="flex gap-2 bg-medical-primary hover:bg-medical-secondary">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
