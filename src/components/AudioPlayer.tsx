import React, { useState, useEffect, useRef } from 'react';
import { RECITERS, getAyahAudioUrl } from '../data/surahYaseen';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  Gauge,
  User,
  Sliders,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface AudioPlayerProps {
  currentAyahNumber: number;
  onAyahChange: (ayahNum: number) => void;
  isPlaying: boolean;
  onPlayPauseToggle: (playing: boolean) => void;
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentAyahNumber,
  onAyahChange,
  isPlaying,
  onPlayPauseToggle,
  autoScroll,
  onToggleAutoScroll,
}) => {
  const [selectedReciter, setSelectedReciter] = useState<string>('alafasy');
  const [repeatMode, setRepeatMode] = useState<'none' | '3x' | '5x' | 'infinite'>('none');
  const [repeatCounter, setRepeatCounter] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = getAyahAudioUrl(currentAyahNumber, selectedReciter);

  // Sync playback on audio url changes or isPlaying toggle
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = playbackSpeed;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio play error:', err);
        onPlayPauseToggle(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioUrl, playbackSpeed]);

  const handleEnded = () => {
    if (repeatMode === 'infinite') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (repeatMode === '3x') {
      if (repeatCounter < 2) {
        setRepeatCounter((prev) => prev + 1);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        return;
      }
      setRepeatCounter(0);
    } else if (repeatMode === '5x') {
      if (repeatCounter < 4) {
        setRepeatCounter((prev) => prev + 1);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        return;
      }
      setRepeatCounter(0);
    }

    // Advance to next Ayah
    if (currentAyahNumber < 83) {
      onAyahChange(currentAyahNumber + 1);
    } else {
      onPlayPauseToggle(false);
    }
  };

  const cycleRepeat = () => {
    setRepeatCounter(0);
    if (repeatMode === 'none') setRepeatMode('3x');
    else if (repeatMode === '3x') setRepeatMode('5x');
    else if (repeatMode === '5x') setRepeatMode('infinite');
    else setRepeatMode('none');
  };

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(0.75);
    else setPlaybackSpeed(1);
  };

  const currentReciter = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl transition-all">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleEnded}
        muted={isMuted}
      />

      <div className="max-w-6xl mx-auto px-4 py-2.5">
        {/* Progress Bar (Hairline) */}
        <div
          className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full cursor-pointer overflow-hidden mb-2"
          onClick={(e) => {
            if (!audioRef.current || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = clickPos * duration;
          }}
        >
          <div
            className="bg-emerald-600 dark:bg-emerald-500 h-full transition-all duration-150"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Left Zone: Current Ayah & Reciter Info */}
          <div className="flex items-center gap-3 min-w-0 max-w-[220px] md:max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
              36:{currentAyahNumber}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                Ayah {currentAyahNumber} of 83
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">{currentReciter.name}</span>
                {repeatMode !== 'none' && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    · {repeatMode === 'infinite' ? 'Loop' : `${repeatMode} (${repeatCounter + 1})`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center Zone: Core Controls */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => {
                if (currentAyahNumber > 1) onAyahChange(currentAyahNumber - 1);
              }}
              disabled={currentAyahNumber <= 1}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 disabled:opacity-30 transition"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={() => onPlayPauseToggle(!isPlaying)}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-md active:scale-95 transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                if (currentAyahNumber < 83) onAyahChange(currentAyahNumber + 1);
              }}
              disabled={currentAyahNumber >= 83}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 disabled:opacity-30 transition"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Right Zone: Secondary Options (Repeat, Speed, Reciter, Auto-scroll) */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            {/* Repeat Mode */}
            <button
              onClick={cycleRepeat}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1 ${
                repeatMode !== 'none'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Repeat Verse"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">
                {repeatMode === 'none' ? '1x' : repeatMode}
              </span>
            </button>

            {/* Playback Speed */}
            <button
              onClick={cycleSpeed}
              className="px-2 py-1 text-xs font-medium rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden sm:flex items-center gap-1"
              title="Playback Speed"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span className="text-[11px]">{playbackSpeed}x</span>
            </button>

            {/* Auto-Scroll Toggle */}
            <button
              onClick={onToggleAutoScroll}
              className={`px-2 py-1 text-xs font-medium rounded-md transition hidden md:flex items-center gap-1 ${
                autoScroll
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Auto-Scroll to verse as it plays"
            >
              Auto-Scroll: {autoScroll ? 'ON' : 'OFF'}
            </button>

            {/* Reciter Selector Dropdown */}
            <select
              value={selectedReciter}
              onChange={(e) => setSelectedReciter(e.target.value)}
              className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 max-w-[120px] md:max-w-[150px] truncate"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
