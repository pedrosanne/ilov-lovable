
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  isStepValid,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit
}: NavigationButtonsProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
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
    );
  }

  return (
    <div className="flex justify-between mt-6">
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
  );
}
