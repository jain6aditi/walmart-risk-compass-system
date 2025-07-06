
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, FileText, AlertTriangle } from "lucide-react";
import { Supplier } from "@/data/mockData";

interface SupplierTableProps {
  suppliers: Supplier[];
  onSupplierSelect: (supplierId: string) => void;
}

const SupplierTable = ({ suppliers, onSupplierSelect }: SupplierTableProps) => {
  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Supplier Directory
        </CardTitle>
        <CardDescription>
          Comprehensive view of all suppliers with risk assessments and compliance status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Supplier</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>ESG Score</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{supplier.name}</div>
                      <div className="text-sm text-gray-500">ID: {supplier.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <div>
                        <div>{supplier.location.city}</div>
                        <div className="text-gray-500">{supplier.location.state}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-lg font-bold ${getScoreColor(supplier.esgScore)}`}>
                      {supplier.esgScore}/100
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRiskBadge(supplier.riskLevel)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {supplier.lastAudit}
                  </TableCell>
                  <TableCell>
                    {supplier.riskEvents.length > 0 ? (
                      <div className="flex items-center text-orange-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span className="text-sm">{supplier.riskEvents.length}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">
                        {supplier.certifications.length}
                      </span>
                      <span className="text-gray-500 ml-1">certs</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSupplierSelect(supplier.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierTable;
