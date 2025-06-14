
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VerificationRequired } from '@/components/verification/VerificationRequired';
import { useCreateAdFormV2 } from '@/hooks/useCreateAdFormV2';
import { XPBar } from '@/components/gamification/XPBar';
import { AchievementNotification } from '@/components/gamification/AchievementNotification';
import { AchievementsList } from '@/components/gamification/AchievementsList';
import { Step1AboutYou } from '@/components/create-ad-v2/Step1AboutYou';
import { Step2Services } from '@/components/create-ad-v2/Step2Services';
import { Step3Pricing } from '@/components/create-ad-v2/Step3Pricing';
import { Step4Media } from '@/components/create-ad-v2/Step4Media';
import { Step5Contact } from '@/components/create-ad-v2/Step5Contact';
import { Step6Final } from '@/components/create-ad-v2/Step6Final';

const CreateAdV2 = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const { 
    formData, 
    updateFormData, 
    isStepValid, 
    submitAd, 
    isSubmitting, 
    completionPercentage,
    gamification 
  } = useCreateAdFormV2();

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
    { id: 1, title: '🎭 Quem é você?', component: Step1AboutYou },
    { id: 2, title: '💼 Seus serviços', component: Step2Services },
    { id: 3, title: '💰 Seus valores', component: Step3Pricing },
    { id: 4, title: '📸 Sua vitrine', component: Step4Media },
    { id: 5, title: '📞 Como te encontrar', component: Step5Contact },
    { id: 6, title: '✨ Finalizando', component: Step6Final },
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentStepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length && isStepValid(currentStep)) {
      // Award XP for completing a step
      gamification.addXP(50, `Etapa ${currentStep} concluída`);
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

  const progress = gamification.getProgress();

  // Prepare props based on current step
  const getStepProps = () => {
    const baseProps = {
      formData,
      updateFormData
    };

    // Only Step6Final needs completionPercentage
    if (currentStep === 6) {
      return {
        ...baseProps,
        completionPercentage
      };
    }

    return baseProps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <AchievementNotification 
        achievements={gamification.newAchievements}
        onClear={gamification.clearNewAchievements}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <VerificationRequired 
          feature="a criação de anúncios"
          description="Para publicar anúncios em nossa plataforma, é necessário verificar sua identidade. Isso garante a segurança e confiabilidade do marketplace."
        >
          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-purple-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Criar Novo Anúncio
                </h1>
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-gray-600 text-lg">
                Transforme seu perfil em um anúncio incrível! 🚀
              </p>
            </div>

            <XPBar 
              xp={gamification.xp}
              level={gamification.level}
              progress={progress}
            />
          </div>

          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep === step.id 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white transform scale-110' 
                      : currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {currentStepData.title}
              </p>
              <p className="text-sm text-gray-500">
                Etapa {currentStep} de {steps.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="border-2 border-purple-100 shadow-lg">
                <CardContent className="p-8">
                  <CurrentStepComponent {...getStepProps()} />
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
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
                      disabled={!isStepValid(currentStep) || isSubmitting}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
                    >
                      <span>{isSubmitting ? 'Publicando...' : '🚀 Publicar Anúncio'}</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                    >
                      <span>Próximo</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <AchievementsList 
                achievements={gamification.achievements}
                unlockedCount={gamification.unlockedCount}
              />
            </div>
          </div>
        </VerificationRequired>
      </div>
    </div>
  );
};

export default CreateAdV2;
