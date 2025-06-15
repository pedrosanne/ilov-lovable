
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAd } from '@/hooks/useAds';
import { useRecordView, useRecordClick } from '@/hooks/useAdActions';
import { useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { RelatedAds } from '@/components/ad-details/RelatedAds';
import { AdDetailsHeader } from '@/components/ad-details/AdDetailsHeader';
import { AdDetailsLoading } from '@/components/ad-details/AdDetailsLoading';
import { AdDetailsError } from '@/components/ad-details/AdDetailsError';
import { AdDetailsMainContent } from '@/components/ad-details/AdDetailsMainContent';
import { AdDetailsSidebar } from '@/components/ad-details/AdDetailsSidebar';

const AdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, error } = useAd(id!);
  const recordView = useRecordView();
  const recordClick = useRecordClick();
  const { isFavorited, toggleFavorite, isToggling } = useFavorites();

  useEffect(() => {
    if (id) {
      recordView.mutate(id);
    }
  }, [id]);

  const handleWhatsAppClick = () => {
    if (ad) {
      recordClick.mutate(ad.id);
      const numbersOnly = ad.whatsapp.replace(/\D/g, '');
      const fullNumber = numbersOnly.startsWith('55') ? numbersOnly : `55${numbersOnly}`;
      const whatsappUrl = `whatsapp://send?phone=${fullNumber}&text=Ol%C3%A1%2C%20te%20encontrei%20no%20iLove%21`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleFavoriteClick = () => {
    if (ad) {
      toggleFavorite(ad.id);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      acompanhante: 'Acompanhante',
      beleza: 'Beleza',
      saude: 'Saúde',
      casa: 'Casa e Jardim',
      tecnologia: 'Tecnologia',
      educacao: 'Educação',
      servicos_gerais: 'Serviços Gerais',
      consultoria: 'Consultoria',
      eventos: 'Eventos'
    };
    return categories[category as keyof typeof categories] || category;
  };

  if (isLoading) {
    return <AdDetailsLoading />;
  }

  if (error || !ad) {
    return <AdDetailsError />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <AdDetailsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdDetailsMainContent 
            ad={ad}
            isFavorited={isFavorited}
            handleFavoriteClick={handleFavoriteClick}
            isToggling={isToggling}
            getCategoryLabel={getCategoryLabel}
          />

          <AdDetailsSidebar 
            ad={ad}
            handleWhatsAppClick={handleWhatsAppClick}
          />
        </div>

        {/* Related Ads Section */}
        <div className="mt-12">
          <RelatedAds 
            currentAdId={ad.id}
            category={ad.category}
            location={ad.location}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdDetails;
