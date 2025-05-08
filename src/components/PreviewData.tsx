
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TestData {
  name: string;
  result: string;
  unit: string;
  low: string;
  high: string;
  status: 'normal' | 'low' | 'high';
}

interface PatientData {
  name: string;
  age: string;
  gender: string;
  labRef: string;
  packageName: string;
  tests: TestData[];
}

interface PreviewDataProps {
  fileName: string;
}

const PreviewData: React.FC<PreviewDataProps> = ({ fileName }) => {
  // This would come from the actual file processing in a real app
  // Here we're using mock data
  const [patientData, setPatientData] = useState<PatientData>({
    name: "Alkhaldi Abdullah Saud",
    age: "44",
    gender: "Male", // Default to prevent select error
    labRef: "2966",
    packageName: "Complete Blood Count",
    tests: [
      {
        name: "Haemoglobin",
        result: "15.6",
        unit: "g/dL",
        low: "13.5",
        high: "17.5",
        status: "normal"
      },
      {
        name: "RBC Count",
        result: "5.77",
        unit: "x10^12/L",
        low: "4.5",
        high: "5.5",
        status: "high"
      },
      {
        name: "WBC Count",
        result: "6.2",
        unit: "x10^9/L",
        low: "4.0",
        high: "11.0",
        status: "normal"
      },
      {
        name: "Platelets",
        result: "145",
        unit: "x10^9/L",
        low: "150",
        high: "450",
        status: "low"
      },
      {
        name: "Hematocrit",
        result: "45.2",
        unit: "%",
        low: "40.0",
        high: "52.0",
        status: "normal"
      }
    ]
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [editableTest, setEditableTest] = useState<TestData | null>(null);
  const [editablePatient, setEditablePatient] = useState({ ...patientData });

  const handleAddTest = () => {
    const newTest: TestData = {
      name: "",
      result: "",
      unit: "",
      low: "",
      high: "",
      status: "normal"
    };
    setEditablePatient({
      ...editablePatient,
      tests: [...editablePatient.tests, newTest]
    });
  };

  const handleDeleteTest = (index: number) => {
    const updatedTests = [...editablePatient.tests];
    updatedTests.splice(index, 1);
    setEditablePatient({
      ...editablePatient,
      tests: updatedTests
    });
  };

  const handleTestChange = (index: number, field: keyof TestData, value: string) => {
    const updatedTests = [...editablePatient.tests];
    
    // Update the specific field
    updatedTests[index] = {
      ...updatedTests[index],
      [field]: value
    };
    
    // Recalculate status if result, low, or high was changed
    if (['result', 'low', 'high'].includes(field)) {
      const test = updatedTests[index];
      const result = parseFloat(test.result);
      const low = parseFloat(test.low);
      const high = parseFloat(test.high);
      
      if (!isNaN(result) && !isNaN(low) && !isNaN(high)) {
        if (result < low) {
          updatedTests[index].status = 'low';
        } else if (result > high) {
          updatedTests[index].status = 'high';
        } else {
          updatedTests[index].status = 'normal';
        }
      }
    }
    
    setEditablePatient({
      ...editablePatient,
      tests: updatedTests
    });
  };

  const handlePatientChange = (field: keyof PatientData, value: string) => {
    setEditablePatient({
      ...editablePatient,
      [field]: value
    });
  };

  const handleSaveChanges = () => {
    setPatientData(editablePatient);
    setEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'low': return 'text-medical-danger';
      case 'high': return 'text-medical-warning';
      default: return 'text-medical-success';
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center border-b border-gray-200 p-4 bg-gray-50">
        <h3 className="font-medium text-lg text-medical-dark flex items-center gap-2">
          <Eye className="h-5 w-5 text-medical-primary" />
          Data Preview
        </h3>
        <Button 
          variant={editing ? "default" : "outline"} 
          size="sm" 
          onClick={() => {
            if (editing) {
              handleSaveChanges();
            } else {
              setEditablePatient({...patientData});
              setEditing(true);
            }
          }}
          className={`${editing ? "bg-medical-success hover:bg-medical-success/90" : ""} gap-2`}
        >
          <Edit2 className="h-4 w-4" />
          {editing ? "Save Changes" : "Edit Data"}
        </Button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Patient Name</label>
            {editing ? (
              <input
                type="text"
                value={editablePatient.name}
                onChange={(e) => handlePatientChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <div className="text-base font-medium">{patientData.name}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Age</label>
            {editing ? (
              <input
                type="text"
                value={editablePatient.age}
                onChange={(e) => handlePatientChange('age', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <div className="text-base font-medium">{patientData.age}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Gender</label>
            {editing ? (
              <select
                value={editablePatient.gender}
                onChange={(e) => handlePatientChange('gender', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="text-base font-medium">{patientData.gender}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Lab Ref No</label>
            {editing ? (
              <input
                type="text"
                value={editablePatient.labRef}
                onChange={(e) => handlePatientChange('labRef', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <div className="text-base font-medium">{patientData.labRef}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Package Name</label>
            {editing ? (
              <select
                value={editablePatient.packageName}
                onChange={(e) => handlePatientChange('packageName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Complete Blood Count">Complete Blood Count</option>
                <option value="Comprehensive Metabolic Panel">Comprehensive Metabolic Panel</option>
                <option value="Lipid Panel">Lipid Panel</option>
                <option value="Thyroid Function Tests">Thyroid Function Tests</option>
              </select>
            ) : (
              <div className="text-base font-medium">{patientData.packageName}</div>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Low</TableHead>
                <TableHead>High</TableHead>
                {editing && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(editing ? editablePatient.tests : patientData.tests).map((test, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editing ? (
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      test.name
                    )}
                  </TableCell>
                  <TableCell className={getStatusColor(test.status)}>
                    {editing ? (
                      <input
                        type="text"
                        value={test.result}
                        onChange={(e) => handleTestChange(index, 'result', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <span className="font-medium">{test.result}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="text"
                        value={test.unit}
                        onChange={(e) => handleTestChange(index, 'unit', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      test.unit
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="text"
                        value={test.low}
                        onChange={(e) => handleTestChange(index, 'low', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      test.low
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="text"
                        value={test.high}
                        onChange={(e) => handleTestChange(index, 'high', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      test.high
                    )}
                  </TableCell>
                  {editing && (
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteTest(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {editing && (
            <div className="mt-4">
              <Button onClick={handleAddTest} variant="outline" size="sm">
                Add New Test
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewData;
