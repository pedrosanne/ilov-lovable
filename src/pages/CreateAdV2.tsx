
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Rocket, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VerificationRequired } from '@/components/verification/VerificationRequired';
import { XPBar } from '@/components/gamification/XPBar';
import { AchievementsList } from '@/components/gamification/AchievementsList';
import { AchievementNotification } from '@/components/gamification/AchievementNotification';
import { Step1AboutYou } from '@/components/create-ad-v2/Step1AboutYou';
import { Step2Services } from '@/components/create-ad-v2/Step2Services';
import { Step3Pricing } from '@/components/create-ad-v2/Step3Pricing';
import { Step4Media } from '@/components/create-ad-v2/Step4Media';
import { Step5Contact } from '@/components/create-ad-v2/Step5Contact';
import { Step6Final } from '@/components/create-ad-v2/Step6Final';
import { useCreateAdFormV2 } from '@/hooks/useCreateAdFormV2';

const CreateAdV2 = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [newAchievement, setNewAchievement] = useState<any>(null);
  const { 
    formData, 
    updateFormData, 
    isValid, 
    submitAd, 
    isSubmitting,
    gamification,
    completionRate
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
    { 
      id: 1, 
      title: '🎭 Quem é você?', 
      component: Step1AboutYou,
      description: 'Conte sobre você e crie um título atrativo'
    },
    { 
      id: 2, 
      title: '💼 Seus serviços', 
      component: Step2Services,
      description: 'Defina seus serviços e disponibilidade'
    },
    { 
      id: 3, 
      title: '💰 Seus valores', 
      component: Step3Pricing,
      description: 'Configure preços e pacote de destaque'
    },
    { 
      id: 4, 
      title: '📸 Sua vitrine', 
      component: Step4Media,
      description: 'Adicione fotos e vídeos incríveis'
    },
    { 
      id: 5, 
      title: '📞 Como te encontrar', 
      component: Step5Contact,
      description: 'Formas de contato e preferências'
    },
    { 
      id: 6, 
      title: '✨ Finalizando', 
      component: Step6Final,
      description: 'Extras e confirmação final'
    },
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentStepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      gamification.addXP(50, `Etapa ${currentStep} completa!`);
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

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <VerificationRequired 
          feature="a criação de anúncios"
          description="Para publicar anúncios em nossa plataforma, é necessário verificar sua identidade."
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🚀 Criar Seu Anúncio Incrível
            </h1>
            <p className="text-gray-600 text-lg">
              Um processo divertido e gamificado para criar o anúncio perfeito!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Coluna principal */}
            <div className="lg:col-span-3 space-y-6">
              {/* XP Bar */}
              <XPBar 
                xp={gamification.xp} 
                level={gamification.level}
                currentLevelProgress={gamification.getCurrentLevelProgress()}
              />

              {/* Progress Bar */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Etapa {currentStep} de {steps.length}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {currentStepData.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(progressPercentage)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        Perfil {Math.round(completionRate)}% completo
                      </div>
                    </div>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  
                  {/* Steps indicator */}
                  <div className="flex justify-between mt-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center space-x-1 ${
                          index + 1 <= currentStep 
                            ? 'text-purple-600' 
                            : 'text-gray-400'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          index + 1 <= currentStep 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="hidden md:block text-xs font-medium">
                          {step.title.split(' ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Step Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {currentStepData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrentStepComponent 
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between">
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
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      <Rocket className="h-5 w-5" />
                      <span>{isSubmitting ? 'Publicando...' : 'Publicar Anúncio!'}</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      <span>Próxima Etapa</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar com conquistas */}
            <div className="lg:col-span-1">
              <AchievementsList achievements={gamification.achievements} />
            </div>
          </div>
        </VerificationRequired>
      </div>

      {/* Achievement Notification */}
      <AchievementNotification 
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />
    </div>
  );
};

export default CreateAdV2;
