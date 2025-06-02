
import { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSearchBrazilianCities } from '@/hooks/useBrazilianCities';
import { Badge } from '@/components/ui/badge';

interface LocationSelectorProps {
  onLocationChange: (location: {
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
  }) => void;
  selectedLocation: {
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
  };
}

export function LocationSelector({ onLocationChange, selectedLocation }: LocationSelectorProps) {
  const [citySearch, setCitySearch] = useState('');
  const { latitude, longitude, loading, error, getCurrentPosition } = useGeolocation();
  const { data: cities } = useSearchBrazilianCities(citySearch);

  const handleUseCurrentLocation = () => {
    getCurrentPosition();
  };

  const handleCitySelect = (cityId: string) => {
    const city = cities?.find(c => c.id === cityId);
    if (city) {
      onLocationChange({
        city: city.name,
        state: city.state_name,
        latitude: city.latitude,
        longitude: city.longitude,
      });
      setCitySearch('');
    }
  };

  const clearLocation = () => {
    onLocationChange({});
  };

  // Use current position when available
  if (latitude && longitude && !selectedLocation.latitude) {
    onLocationChange({
      latitude,
      longitude,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Navigation className="h-4 w-4" />
          {loading ? 'Localizando...' : 'Usar minha localização'}
        </Button>
        
        {selectedLocation.city && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {selectedLocation.city}, {selectedLocation.state}
            <button onClick={clearLocation} className="ml-1 text-xs">×</button>
          </Badge>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Digite uma cidade..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          className="pl-10"
        />
        
        {cities && cities.length > 0 && citySearch.length >= 2 && (
          <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{city.name}</span>
                <span className="text-sm text-gray-500">{city.state_code}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Select
        value=""
        onValueChange={(value) => {
          const [stateName, stateCode] = value.split('|');
          onLocationChange({
            state: stateName,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ou escolha um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="São Paulo|SP">São Paulo</SelectItem>
          <SelectItem value="Rio de Janeiro|RJ">Rio de Janeiro</SelectItem>
          <SelectItem value="Minas Gerais|MG">Minas Gerais</SelectItem>
          <SelectItem value="Paraná|PR">Paraná</SelectItem>
          <SelectItem value="Bahia|BA">Bahia</SelectItem>
          <SelectItem value="Ceará|CE">Ceará</SelectItem>
          <SelectItem value="Distrito Federal|DF">Distrito Federal</SelectItem>
          <SelectItem value="Amazonas|AM">Amazonas</SelectItem>
          <SelectItem value="Pernambuco|PE">Pernambuco</SelectItem>
          <SelectItem value="Goiás|GO">Goiás</SelectItem>
          <SelectItem value="Pará|PA">Pará</SelectItem>
          <SelectItem value="Maranhão|MA">Maranhão</SelectItem>
          <SelectItem value="Alagoas|AL">Alagoas</SelectItem>
          <SelectItem value="Rio Grande do Norte|RN">Rio Grande do Norte</SelectItem>
          <SelectItem value="Piauí|PI">Piauí</SelectItem>
          <SelectItem value="Mato Grosso do Sul|MS">Mato Grosso do Sul</SelectItem>
          <SelectItem value="Paraíba|PB">Paraíba</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
