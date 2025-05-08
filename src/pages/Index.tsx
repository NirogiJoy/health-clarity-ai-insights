
import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadZone from '@/components/UploadZone';
import PreviewData from '@/components/PreviewData';
import HealthScorePanel from '@/components/HealthScorePanel';
import InsightsPanel from '@/components/InsightsPanel';
import TrustBadges from '@/components/TrustBadges';
import ConversionPanel from '@/components/ConversionPanel';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleFileUploaded = (fileName: string) => {
    setUploadedFile(fileName);
    setShowPreview(false);
  };
  
  const handlePreviewTests = () => {
    setShowPreview(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-medical-dark mb-4">
                Understand Your Lab Results in Seconds
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Our AI analyzes your lab reports, highlights abnormal values, and provides personalized health insights in plain language.
              </p>
              <div className="space-y-6">
                <UploadZone onFileUploaded={handleFileUploaded} />
                
                {uploadedFile && !showPreview && (
                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      onClick={handlePreviewTests}
                      className="bg-medical-primary hover:bg-medical-secondary"
                    >
                      Preview Tests
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        {showPreview && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-10">
                <PreviewData fileName={uploadedFile!} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <HealthScorePanel />
                  <InsightsPanel />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <TrustBadges />
                  </div>
                  <div className="lg:col-span-4">
                    <ConversionPanel />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Trust Indicators Section */}
        {!showPreview && (
          <section className="py-12 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-8">Trusted by Healthcare Professionals and Patients</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-medical-primary mb-2">100k+</div>
                    <div className="text-gray-600">Reports Analyzed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-medical-primary mb-2">98%</div>
                    <div className="text-gray-600">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-medical-primary mb-2">15k+</div>
                    <div className="text-gray-600">Health Insights Generated</div>
                  </div>
                </div>
                
                <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 text-center">
                      <div className="bg-medical-light/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-medical-primary font-bold">1</span>
                      </div>
                      <h4 className="text-lg font-medium mb-1">Upload Your Report</h4>
                      <p className="text-sm text-gray-600">Simply drag and drop your lab report PDF or CSV file</p>
                    </div>
                    <div className="p-4 text-center">
                      <div className="bg-medical-light/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-medical-primary font-bold">2</span>
                      </div>
                      <h4 className="text-lg font-medium mb-1">AI Analysis</h4>
                      <p className="text-sm text-gray-600">Our system extracts and analyzes your lab data instantly</p>
                    </div>
                    <div className="p-4 text-center">
                      <div className="bg-medical-light/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-medical-primary font-bold">3</span>
                      </div>
                      <h4 className="text-lg font-medium mb-1">Get Insights</h4>
                      <p className="text-sm text-gray-600">Review personalized health insights and recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-medical-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">Health Clarity</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">© 2025. All rights reserved.</div>
            </div>
            <div className="flex gap-8">
              <div className="space-y-1">
                <div className="text-sm font-medium">Product</div>
                <ul className="space-y-1">
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Company</div>
                <ul className="space-y-1">
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Legal</div>
                <ul className="space-y-1">
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white">Disclaimer</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
