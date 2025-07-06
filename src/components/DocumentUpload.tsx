
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { esgCategories } from "@/data/mockData";

interface Document {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  size: string;
}

const DocumentUpload = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Carbon Footprint Report 2024.pdf',
      category: 'carbonEmissions',
      uploadDate: '2024-01-10',
      status: 'approved',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Labor Audit Certificate.pdf',
      category: 'laborPractices',
      uploadDate: '2024-01-08',
      status: 'approved',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Renewable Energy Certificates.pdf',
      category: 'renewableEnergy',
      uploadDate: '2024-01-15',
      status: 'pending',
      size: '3.1 MB'
    }
  ]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedCategory) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        category: selectedCategory,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setDocuments([...documents, newDoc]);
      toast({
        title: "Document Uploaded Successfully",
        description: `${file.name} has been uploaded and is pending review.`,
      });
      
      // Reset form
      setSelectedCategory("");
      e.target.value = "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryName = (categoryId: string) => {
    return esgCategories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Upload Compliance Documents
          </CardTitle>
          <CardDescription>
            Submit your ESG documentation for review and scoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">ESG Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {esgCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Document File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileUpload}
                disabled={!selectedCategory}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          {selectedCategory && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Required Documents for {getCategoryName(selectedCategory)}:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {esgCategories.find(cat => cat.id === selectedCategory)?.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            Uploaded Documents
          </CardTitle>
          <CardDescription>
            Track the status of your submitted compliance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">
                      {getCategoryName(doc.category)} • {doc.size} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(doc.status)} variant="secondary">
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(doc.status)}
                      <span className="capitalize">{doc.status}</span>
                    </span>
                  </Badge>
                  {doc.status === 'rejected' && (
                    <Button variant="outline" size="sm">
                      Re-upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {documents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No documents uploaded yet</p>
                <p className="text-sm">Upload your first compliance document to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation Progress</CardTitle>
          <CardDescription>Complete all categories to maximize your ESG score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {esgCategories.map((category) => {
              const hasDocument = documents.some(doc => doc.category === category.id);
              return (
                <div key={category.id} className={`p-3 rounded-lg border text-center ${
                  hasDocument ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    hasDocument ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {hasDocument ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {category.name.split(' ')[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
