
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, AlertTriangle } from "lucide-react";
import { Supplier } from "@/data/mockData";

interface SupplierHeatMapProps {
  suppliers: Supplier[];
  onSupplierSelect: (supplierId: string) => void;
}

const SupplierHeatMap = ({ suppliers, onSupplierSelect }: SupplierHeatMapProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIntensity = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'opacity-60';
      case 'medium': return 'opacity-80';
      case 'high': return 'opacity-100';
      default: return 'opacity-40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            India Supplier Risk Heat Map
          </CardTitle>
          <CardDescription>
            Interactive visualization of supplier risk levels across Indian regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full opacity-60"></div>
              <span className="text-sm">Low Risk (ESG Score 80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80"></div>
              <span className="text-sm">Medium Risk (ESG Score 60-79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">High Risk (ESG Score <60)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map Simulation */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-96 overflow-hidden">
            {/* Simulated India Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 opacity-30"></div>
            
            {/* Heat Map Zones */}
            <div className="absolute inset-0">
              {/* Maharashtra Zone (Mumbai) */}
              <div className="absolute" style={{ top: '60%', left: '25%' }}>
                <div className={`w-16 h-16 ${getRiskColor('low')} ${getRiskIntensity('low')} rounded-full blur-xl`}></div>
                <div className="absolute -top-2 -left-4 bg-white rounded-lg shadow-lg border p-3 w-32">
                  <div className="text-xs font-semibold">Maharashtra</div>
                  <div className="text-xs text-gray-600">1 supplier</div>
                  <Badge className="bg-green-100 text-green-800 text-xs mt-1">Low Risk</Badge>
                </div>
              </div>

              {/* Delhi Zone */}
              <div className="absolute" style={{ top: '35%', left: '35%' }}>
                <div className={`w-12 h-12 ${getRiskColor('medium')} ${getRiskIntensity('medium')} rounded-full blur-lg`}></div>
                <div className="absolute -top-2 -left-4 bg-white rounded-lg shadow-lg border p-3 w-32">
                  <div className="text-xs font-semibold">Delhi</div>
                  <div className="text-xs text-gray-600">1 supplier</div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-1">Medium Risk</Badge>
                </div>
              </div>

              {/* Karnataka Zone (Bangalore) */}
              <div className="absolute" style={{ top: '75%', left: '35%' }}>
                <div className={`w-20 h-20 ${getRiskColor('high')} ${getRiskIntensity('high')} rounded-full blur-xl animate-pulse`}></div>
                <div className="absolute -top-2 -left-4 bg-white rounded-lg shadow-lg border p-3 w-32">
                  <div className="text-xs font-semibold">Karnataka</div>
                  <div className="text-xs text-gray-600">1 supplier</div>
                  <Badge className="bg-red-100 text-red-800 text-xs mt-1">High Risk</Badge>
                </div>
              </div>

              {/* Tamil Nadu Zone (Chennai) */}
              <div className="absolute" style={{ top: '85%', left: '40%' }}>
                <div className={`w-14 h-14 ${getRiskColor('low')} ${getRiskIntensity('low')} rounded-full blur-lg`}></div>
                <div className="absolute -top-2 -left-4 bg-white rounded-lg shadow-lg border p-3 w-32">
                  <div className="text-xs font-semibold">Tamil Nadu</div>
                  <div className="text-xs text-gray-600">1 supplier</div>
                  <Badge className="bg-green-100 text-green-800 text-xs mt-1">Low Risk</Badge>
                </div>
              </div>

              {/* West Bengal Zone (Kolkata) */}
              <div className="absolute" style={{ top: '45%', left: '55%' }}>
                <div className={`w-14 h-14 ${getRiskColor('medium')} ${getRiskIntensity('medium')} rounded-full blur-lg`}></div>
                <div className="absolute -top-2 -left-4 bg-white rounded-lg shadow-lg border p-3 w-32">
                  <div className="text-xs font-semibold">West Bengal</div>
                  <div className="text-xs text-gray-600">1 supplier</div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-1">Medium Risk</Badge>
                </div>
              </div>
            </div>

            {/* Map Title Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 backdrop-blur-sm">
              <h3 className="font-bold text-gray-900">India Supplier Network</h3>
              <p className="text-sm text-gray-600">Real-time ESG risk monitoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSupplierSelect(supplier.id)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <Badge className={
                  supplier.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                  supplier.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {supplier.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {supplier.location.city}, {supplier.location.state}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ESG Score</span>
                  <span className={`font-bold text-lg ${
                    supplier.esgScore >= 80 ? 'text-green-600' :
                    supplier.esgScore >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {supplier.esgScore}/100
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Audit</span>
                  <span>{supplier.lastAudit}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Certifications</span>
                  <span className="text-blue-600">{supplier.certifications.length}</span>
                </div>

                {supplier.riskEvents.length > 0 && (
                  <div className="flex items-center text-sm text-orange-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {supplier.riskEvents.length} active alert{supplier.riskEvents.length > 1 ? 's' : ''}
                  </div>
                )}

                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupplierHeatMap;
