
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, FileText, Eye, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#4de9d8]" />
          <CardTitle className="text-lg font-semibold text-gray-900">
            Ações Rápidas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full justify-start bg-gradient-to-r from-[#4de9d8] to-[#3bc9d8] hover:from-[#3bc9d8] hover:to-[#2ab5c5] text-white border-0 shadow-md rounded-2xl h-12" 
          asChild
        >
          <Link to="/profile?tab=edit">
            <Camera className="h-4 w-4 mr-3" />
            Atualizar Fotos
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start border-2 border-gray-200 hover:border-[#4de9d8] hover:bg-[#4de9d8]/5 rounded-2xl h-12" 
          asChild
        >
          <Link to="/my-ads">
            <FileText className="h-4 w-4 mr-3" />
            Meus Anúncios
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start border-2 border-gray-200 hover:border-[#4de9d8] hover:bg-[#4de9d8]/5 rounded-2xl h-12" 
          asChild
        >
          <Link to="/">
            <Eye className="h-4 w-4 mr-3" />
            Ver como Cliente
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
