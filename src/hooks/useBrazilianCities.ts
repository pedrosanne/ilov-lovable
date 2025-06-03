
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BrazilianCity {
  id: string;
  name: string;
  state_code: string;
  state_name: string;
  latitude: number;
  longitude: number;
  population: number;
}

export function useBrazilianCities() {
  return useQuery({
    queryKey: ['brazilian-cities'],
    queryFn: async () => {
      // Usar rpc ou query raw para contornar a limitação dos tipos
      const { data, error } = await supabase
        .rpc('get_brazilian_cities');

      if (error) {
        console.error('Error fetching cities:', error);
        // Fallback para dados estáticos se a função não existir
        return getBrazilianCitiesFallback();
      }

      return data as BrazilianCity[];
    },
  });
}

export function useSearchBrazilianCities(searchTerm: string) {
  return useQuery({
    queryKey: ['search-brazilian-cities', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) {
        return [];
      }

      // Usar dados estáticos por enquanto para evitar problemas de tipos
      const cities = getBrazilianCitiesFallback();
      
      return cities
        .filter(city => 
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.state_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);
    },
    enabled: searchTerm.length >= 2,
  });
}

// Dados de fallback com as principais cidades brasileiras
function getBrazilianCitiesFallback(): BrazilianCity[] {
  return [
    { id: '1', name: 'São Paulo', state_code: 'SP', state_name: 'São Paulo', latitude: -23.5505, longitude: -46.6333, population: 12000000 },
    { id: '2', name: 'Rio de Janeiro', state_code: 'RJ', state_name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729, population: 6748000 },
    { id: '3', name: 'Brasília', state_code: 'DF', state_name: 'Distrito Federal', latitude: -15.7942, longitude: -47.8822, population: 2817000 },
    { id: '4', name: 'Salvador', state_code: 'BA', state_name: 'Bahia', latitude: -12.9714, longitude: -38.5014, population: 2886000 },
    { id: '5', name: 'Fortaleza', state_code: 'CE', state_name: 'Ceará', latitude: -3.7319, longitude: -38.5267, population: 2669000 },
    { id: '6', name: 'Belo Horizonte', state_code: 'MG', state_name: 'Minas Gerais', latitude: -19.9191, longitude: -43.9378, population: 2521000 },
    { id: '7', name: 'Manaus', state_code: 'AM', state_name: 'Amazonas', latitude: -3.1190, longitude: -60.0217, population: 2219000 },
    { id: '8', name: 'Curitiba', state_code: 'PR', state_name: 'Paraná', latitude: -25.4244, longitude: -49.2654, population: 1948000 },
    { id: '9', name: 'Recife', state_code: 'PE', state_name: 'Pernambuco', latitude: -8.0476, longitude: -34.8770, population: 1653000 },
    { id: '10', name: 'Goiânia', state_code: 'GO', state_name: 'Goiás', latitude: -16.6869, longitude: -49.2648, population: 1516000 },
    { id: '11', name: 'Belém', state_code: 'PA', state_name: 'Pará', latitude: -1.4558, longitude: -48.5044, population: 1499000 },
    { id: '12', name: 'Guarulhos', state_code: 'SP', state_name: 'São Paulo', latitude: -23.4538, longitude: -46.5333, population: 1392000 },
    { id: '13', name: 'Campinas', state_code: 'SP', state_name: 'São Paulo', latitude: -22.9099, longitude: -47.0626, population: 1204000 },
    { id: '14', name: 'São Luís', state_code: 'MA', state_name: 'Maranhão', latitude: -2.5387, longitude: -44.2827, population: 1108000 },
    { id: '15', name: 'São Gonçalo', state_code: 'RJ', state_name: 'Rio de Janeiro', latitude: -22.8267, longitude: -43.0537, population: 1084000 },
    { id: '16', name: 'Maceió', state_code: 'AL', state_name: 'Alagoas', latitude: -9.6658, longitude: -35.7353, population: 1025000 },
    { id: '17', name: 'Duque de Caxias', state_code: 'RJ', state_name: 'Rio de Janeiro', latitude: -22.7856, longitude: -43.3117, population: 924000 },
    { id: '18', name: 'Natal', state_code: 'RN', state_name: 'Rio Grande do Norte', latitude: -5.7945, longitude: -35.2110, population: 890000 },
    { id: '19', name: 'Teresina', state_code: 'PI', state_name: 'Piauí', latitude: -5.0892, longitude: -42.8019, population: 868000 },
    { id: '20', name: 'Campo Grande', state_code: 'MS', state_name: 'Mato Grosso do Sul', latitude: -20.4697, longitude: -54.6201, population: 906000 },
    { id: '21', name: 'João Pessoa', state_code: 'PB', state_name: 'Paraíba', latitude: -7.1195, longitude: -34.8450, population: 817000 },
    { id: '22', name: 'Santo André', state_code: 'SP', state_name: 'São Paulo', latitude: -23.6540, longitude: -46.5386, population: 721000 },
    { id: '23', name: 'Osasco', state_code: 'SP', state_name: 'São Paulo', latitude: -23.5329, longitude: -46.7916, population: 696000 },
    { id: '24', name: 'Jaboatão dos Guararapes', state_code: 'PE', state_name: 'Pernambuco', latitude: -8.1130, longitude: -35.0146, population: 702000 },
    { id: '25', name: 'São José dos Campos', state_code: 'SP', state_name: 'São Paulo', latitude: -23.2237, longitude: -45.9009, population: 695000 }
  ];
}
