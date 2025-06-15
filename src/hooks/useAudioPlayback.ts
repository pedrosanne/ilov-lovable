
import { useState, useRef, useCallback } from 'react';

export function useAudioPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bands = 20;
    const bandSize = Math.floor(dataArray.length / bands);
    const levels = [];

    for (let i = 0; i < bands; i++) {
      const start = i * bandSize;
      const end = start + bandSize;
      const bandData = dataArray.slice(start, end);
      const average = bandData.reduce((sum, value) => sum + value, 0) / bandData.length;
      levels.push(average / 255);
    }

    setAudioLevels(levels);
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateAudioLevels);
    }
  }, [isPlaying]);

  const playAudio = useCallback(async (audioUrl: string) => {
    if (!audioUrl) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);
        source.connect(audioContextRef.current.destination);

        await audioRef.current.play();
        setIsPlaying(true);
        updateAudioLevels();
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  }, [isPlaying, updateAudioLevels]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setAudioLevels(new Array(20).fill(0));
  }, []);

  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleAudioLoad = useCallback(() => {
    setAudioLevels(new Array(20).fill(0));
  }, []);

  return {
    isPlaying,
    audioLevels,
    audioRef,
    playAudio,
    handleAudioEnded,
    handleAudioPause,
    handleAudioLoad
  };
}
