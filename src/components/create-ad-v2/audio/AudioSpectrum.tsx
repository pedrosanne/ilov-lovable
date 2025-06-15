
interface AudioSpectrumProps {
  levels: number[];
  isActive: boolean;
}

export function AudioSpectrum({ levels, isActive }: AudioSpectrumProps) {
  return (
    <div className="flex items-center justify-center space-x-1 h-12 bg-gray-50 rounded-lg p-2">
      {levels.map((level, index) => (
        <div
          key={index}
          className={`w-1 bg-gradient-to-t transition-all duration-100 rounded-full ${
            isActive ? 'from-blue-400 to-blue-600' : 'from-gray-300 to-gray-400'
          }`}
          style={{
            height: `${Math.max(4, level * 40)}px`,
            opacity: isActive ? Math.max(0.3, level) : 0.3
          }}
        />
      ))}
    </div>
  );
}
