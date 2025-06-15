
import { cn } from '@/lib/utils';

interface HeartPreloaderProps {
  className?: string;
  size?: number;
}

export function HeartPreloader({ className, size = 64 }: HeartPreloaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="animate-pulse"
      >
        <path
          d="M50 85 C50 85, 20 50, 20 30 C20 15, 35 15, 50 30 C65 15, 80 15, 80 30 C80 50, 50 85, 50 85 Z"
          fill="none"
          stroke="#4de9d8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="animate-heart-draw"
        />
      </svg>
    </div>
  );
}
