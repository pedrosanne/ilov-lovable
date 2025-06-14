
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            {currentStep} / {steps.length}
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 px-4">
            {steps[currentStep - 1]?.title}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
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
              {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
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
          {steps[currentStep - 1]?.title}
        </p>
        <p className="text-sm text-gray-500">
          Etapa {currentStep} de {steps.length}
        </p>
      </div>
    </div>
  );
}
