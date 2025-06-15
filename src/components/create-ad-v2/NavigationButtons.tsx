
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Step {
  id: number;
  title: string;
}

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  steps: Step[];
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  isStepValid,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  steps
}: NavigationButtonsProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Progress Bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {currentStep} / {totalSteps}
            </div>
          </div>
          <div className="text-center mb-2">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {steps[currentStep - 1]?.title}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-4 pb-4">
          <div className="flex justify-between space-x-3">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={currentStep === 1}
              className="flex-1 flex items-center justify-center space-x-2 py-3"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={onSubmit}
                disabled={!isStepValid || isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3"
              >
                <span>{isSubmitting ? 'Publicando...' : '🚀 Publicar'}</span>
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!isStepValid}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3"
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      {/* Progress Indicator */}
      <div className="px-8 pt-4 pb-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === step.id 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white transform scale-110' 
                    : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-all ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mb-3">
            <p className="text-sm font-semibold text-gray-800">
              {steps[currentStep - 1]?.title}
            </p>
            <p className="text-xs text-gray-500">
              Etapa {currentStep} de {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-8 pb-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Anterior</span>
          </Button>

          <div className="flex space-x-4">
            {currentStep === totalSteps ? (
              <Button
                onClick={onSubmit}
                disabled={!isStepValid || isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
              >
                <span>{isSubmitting ? 'Publicando...' : '🚀 Publicar Anúncio'}</span>
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!isStepValid}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
