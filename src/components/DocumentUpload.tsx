
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, X, AlertCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { esgCategories } from "@/data/mockData";

interface Document {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  size: string;
  documentType: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Carbon Footprint Report 2024.pdf',
      category: 'carbonEmissions',
      uploadDate: '2024-01-10',
      status: 'approved',
      size: '2.3 MB',
      documentType: 'GHG Inventory Reports'
    },
    {
      id: '2',
      name: 'Labor Audit Certificate.pdf',
      category: 'laborPractices',
      uploadDate: '2024-01-08',
      status: 'approved',
      size: '1.8 MB',
      documentType: 'Social audits (SMETA)'
    },
    {
      id: '3',
      name: 'Renewable Energy Certificates.pdf',
      category: 'renewableEnergy',
      uploadDate: '2024-01-15',
      status: 'pending',
      size: '3.1 MB',
      documentType: 'Renewable Energy Certificates (RECs)'
    }
  ]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string, documentType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        category: categoryId,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        documentType: documentType
      };
      
      setDocuments([...documents, newDoc]);
      toast({
        title: "Document Uploaded Successfully",
        description: `${file.name} has been uploaded for ${documentType} and is pending review.`,
      });
      
      // Reset file input
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

  const getCategoryDocuments = (categoryId: string) => {
    return documents.filter(doc => doc.category === categoryId);
  };

  const getDocumentProgress = (categoryId: string, requiredDocs: string[]) => {
    const categoryDocs = getCategoryDocuments(categoryId);
    const uploadedTypes = categoryDocs.map(doc => doc.documentType);
    const uploaded = requiredDocs.filter(doc => uploadedTypes.includes(doc)).length;
    return { uploaded, total: requiredDocs.length, percentage: (uploaded / requiredDocs.length) * 100 };
  };

  return (
    <div className="space-y-6">
      {/* Category-wise Document Upload */}
      <div className="grid gap-6">
        {esgCategories.map((category) => {
          const progress = getDocumentProgress(category.id, category.requiredDocuments);
          const categoryDocs = getCategoryDocuments(category.id);
          
          return (
            <Card key={category.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {progress.uploaded}/{progress.total} Documents
                    </Badge>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Required Documents List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">Required Documents:</h4>
                  {category.requiredDocuments.map((docType, index) => {
                    const isUploaded = categoryDocs.some(doc => doc.documentType === docType);
                    const uploadedDoc = categoryDocs.find(doc => doc.documentType === docType);
                    
                    return (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {isUploaded ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-600" />
                            )}
                            <span className="font-medium text-gray-900">{docType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isUploaded && uploadedDoc && (
                              <Badge className={getStatusColor(uploadedDoc.status)} variant="secondary">
                                <span className="flex items-center space-x-1">
                                  {getStatusIcon(uploadedDoc.status)}
                                  <span className="capitalize">{uploadedDoc.status}</span>
                                </span>
                              </Badge>
                            )}
                            <div className="relative">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(e, category.id, docType)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id={`file-${category.id}-${index}`}
                              />
                              <Button 
                                variant={isUploaded ? "outline" : "default"} 
                                size="sm"
                                className="cursor-pointer"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                {isUploaded ? "Re-upload" : "Upload"}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {isUploaded && uploadedDoc && (
                          <div className="mt-2 p-2 bg-white rounded border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">{uploadedDoc.name}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {uploadedDoc.size} • {uploadedDoc.uploadDate}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            Overall Documentation Progress
          </CardTitle>
          <CardDescription>
            Complete all categories to maximize your ESG score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {esgCategories.map((category) => {
              const progress = getDocumentProgress(category.id, category.requiredDocuments);
              const isComplete = progress.percentage === 100;
              
              return (
                <div key={category.id} className={`p-3 rounded-lg border text-center ${
                  isComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-900 mb-1">
                    {category.name.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {progress.uploaded}/{progress.total}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Uploaded Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            All Uploaded Documents ({documents.length})
          </CardTitle>
          <CardDescription>
            View and manage all your submitted compliance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">
                      {doc.documentType} • {doc.size} • {doc.uploadDate}
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
    </div>
  );
};

export default DocumentUpload;
