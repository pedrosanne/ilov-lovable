
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateAd } from '@/hooks/useUpdateAd';
import { Ad } from '@/types/database';
import { Save, ArrowLeft } from 'lucide-react';

interface EditAdFormProps {
  ad: Ad;
}

export function EditAdForm({ ad }: EditAdFormProps) {
  const navigate = useNavigate();
  const updateAdMutation = useUpdateAd();
  
  const [formData, setFormData] = useState({
    title: ad.title,
    description: ad.description,
    price: ad.price?.toString() || '',
    location: ad.location,
    whatsapp: ad.whatsapp,
    category: ad.category,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    updateAdMutation.mutate({
      id: ad.id,
      data: updateData,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      beleza: 'Beleza',
      saude: 'Saúde',
      casa: 'Casa',
      tecnologia: 'Tecnologia',
      educacao: 'Educação',
      servicos_gerais: 'Serviços Gerais',
      consultoria: 'Consultoria',
      eventos: 'Eventos',
      acompanhante: 'Acompanhante'
    };
    return categories[category as keyof typeof categories] || category;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/my-ads')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <CardTitle>Informações do Anúncio</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Título do anúncio"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descreva seu serviço..."
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Cidade, Estado"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beleza">Beleza</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="servicos_gerais">Serviços Gerais</SelectItem>
                <SelectItem value="consultoria">Consultoria</SelectItem>
                <SelectItem value="eventos">Eventos</SelectItem>
                <SelectItem value="acompanhante">Acompanhante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-ads')}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateAdMutation.isPending}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateAdMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
