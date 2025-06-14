
import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
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
