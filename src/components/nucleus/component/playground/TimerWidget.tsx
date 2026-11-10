import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import './TimerWidget.css';

export function TimerWidget() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interval timer handler
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  // Click outside listener to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(false);
    setSeconds(0);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="timer-widget-wrapper" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="timer-trigger-btn"
        title="Practice Timer / Stopwatch"
      >
        <Clock 
          size={14} 
          className={isRunning ? 'timer-icon-running' : 'timer-icon-idle'} 
        />
        <span className="timer-display-text">{formatTime(seconds)}</span>
      </button>

      {/* Popover Stopwatch Card */}
      {isOpen && (
        <div className="timer-popover-card">
          <div className="timer-popover-title">
            Practice Stopwatch
          </div>
          
          <div className="timer-digits-large">
            {formatTime(seconds)}
          </div>

          <div className="timer-actions-row">
            <button
              onClick={handleToggle}
              className={`btn-timer-toggle ${isRunning ? 'btn-timer-pause' : 'btn-timer-start'}`}
            >
              {isRunning ? (
                <>
                  <Pause size={13} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" />
                  <span>Start</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="btn-timer-reset"
              title="Reset Stopwatch"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimerWidget;