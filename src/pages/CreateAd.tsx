import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VerificationRequired } from '@/components/verification/VerificationRequired';
import { PersonalInfoStep } from '@/components/create-ad/PersonalInfoStep';
import { DescriptionStep } from '@/components/create-ad/DescriptionStep';
import { ServicesStep } from '@/components/create-ad/ServicesStep';
import { AvailabilityStep } from '@/components/create-ad/AvailabilityStep';
import { LocationStep } from '@/components/create-ad/LocationStep';
import { PricingStep } from '@/components/create-ad/PricingStep';
import { MediaStep } from '@/components/create-ad/MediaStep';
import { ContactStep } from '@/components/create-ad/ContactStep';
import { SecurityStep } from '@/components/create-ad/SecurityStep';
import { PreferencesStep } from '@/components/create-ad/PreferencesStep';
import { ExtrasStep } from '@/components/create-ad/ExtrasStep';
import { HighlightStep } from '@/components/create-ad/HighlightStep';
import { PreviewStep } from '@/components/create-ad/PreviewStep';
import { useCreateAdForm } from '@/hooks/useCreateAdForm';

const CreateAd = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, updateFormData, isValid, submitAd, isSubmitting } = useCreateAdForm();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const steps = [
    { id: 1, title: 'Informações Pessoais', component: PersonalInfoStep },
    { id: 2, title: 'Descrição', component: DescriptionStep },
    { id: 3, title: 'Serviços', component: ServicesStep },
    { id: 4, title: 'Disponibilidade', component: AvailabilityStep },
    { id: 5, title: 'Localização', component: LocationStep },
    { id: 6, title: 'Valores', component: PricingStep },
    { id: 7, title: 'Fotos e Vídeos', component: MediaStep },
    { id: 8, title: 'Contato', component: ContactStep },
    { id: 9, title: 'Segurança', component: SecurityStep },
    { id: 10, title: 'Preferências', component: PreferencesStep },
    { id: 11, title: 'Extras', component: ExtrasStep },
    { id: 12, title: 'Destaque', component: HighlightStep },
    { id: 13, title: 'Pré-visualização', component: PreviewStep },
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentStepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitAd();
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <VerificationRequired 
          feature="a criação de anúncios"
          description="Para publicar anúncios em nossa plataforma, é necessário verificar sua identidade. Isso garante a segurança e confiabilidade do marketplace."
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Criar Novo Anúncio
            </h1>
            <p className="text-gray-600">
              Preencha todas as informações para criar seu anúncio profissional
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Etapa {currentStep} de {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / steps.length) * 100)}% concluído
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{currentStepData.title}</span>
                {currentStep === 13 && <Eye className="h-5 w-5" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent 
                formData={formData}
                updateFormData={updateFormData}
              />
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            <div className="flex space-x-4">
              {currentStep === steps.length ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <span>{isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}</span>
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Próximo</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </VerificationRequired>
      </div>
    </div>
  );
};

export default CreateAd;
