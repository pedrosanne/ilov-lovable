import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VerificationRequired } from '@/components/verification/VerificationRequired';
import { useCreateAdFormV2 } from '@/hooks/useCreateAdFormV2';
import { AchievementNotification } from '@/components/gamification/AchievementNotification';
import { AchievementsList } from '@/components/gamification/AchievementsList';
import { CreateAdHeader } from '@/components/create-ad-v2/CreateAdHeader';
import { StepIndicator } from '@/components/create-ad-v2/StepIndicator';
import { NavigationButtons } from '@/components/create-ad-v2/NavigationButtons';
import { Step1AboutYou } from '@/components/create-ad-v2/Step1AboutYou';
import { Step2Services } from '@/components/create-ad-v2/Step2Services';
import { Step3Pricing } from '@/components/create-ad-v2/Step3Pricing';
import { Step4Media } from '@/components/create-ad-v2/Step4Media';
import { Step5Contact } from '@/components/create-ad-v2/Step5Contact';
import { Step6Voice } from '@/components/create-ad-v2/Step6Voice';
import { Step7Final } from '@/components/create-ad-v2/Step7Final';
import { useIsMobile } from '@/hooks/use-mobile';

const CreateAdV2 = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = useIsMobile();
  const { 
    formData, 
    updateFormData, 
    isStepValid, 
    submitAd, 
    isSubmitting, 
    completionPercentage,
    gamification,
    scrollToTop
  } = useCreateAdFormV2();

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  // Scroll to top when step changes
  useEffect(() => {
    scrollToTop();
  }, [currentStep, scrollToTop]);

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
    { id: 6, title: '🎤 Sua voz', component: Step6Voice },
    { id: 7, title: '✨ Finalizando', component: Step7Final },
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentStepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length && isStepValid(currentStep)) {
      gamification.unlockAchievement(`step_${currentStep}`);
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
      gamification.unlockAchievement(`step_7`);
      await submitAd();
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
    }
  };

  const progress = gamification.getProgress();

  const getStepProps = () => {
    const baseProps = {
      formData,
      updateFormData
    };

    if (currentStep === 7) {
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
      
      <div className={`container mx-auto px-4 py-8 ${isMobile ? 'pb-32' : 'pb-32 max-w-4xl'}`}>
        <VerificationRequired 
          feature="a criação de anúncios"
          description="Para publicar anúncios em nossa plataforma, é necessário verificar sua identidade. Isso garante a segurança e confiabilidade do marketplace."
        >
          <CreateAdHeader 
            xp={gamification.xp}
            level={gamification.level}
            progress={progress}
          />

          <StepIndicator 
            steps={steps}
            currentStep={currentStep}
          />

          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
              <Card className="border-2 border-purple-100 shadow-lg">
                <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
                  <CurrentStepComponent {...getStepProps()} />
                </CardContent>
              </Card>
            </div>

            {!isMobile && (
              <div className="lg:col-span-1">
                <AchievementsList 
                  achievements={gamification.achievements}
                  unlockedCount={gamification.unlockedCount}
                  currentStep={currentStep}
                />
              </div>
            )}
          </div>

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            isStepValid={isStepValid(currentStep)}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            steps={steps}
          />
        </VerificationRequired>
      </div>
    </div>
  );
};

export default CreateAdV2;
