
import { formatTime } from '@/utils/commonFunctions';
import React from 'react';

interface PropType {
    isRunning: boolean;
    elapsedTime:number;
}

const Stopwatch: React.FC<PropType> = ({isRunning, elapsedTime}) => {
  const secondsDegrees = (elapsedTime % 60) * 6;
  const minutesDegrees = ((elapsedTime % 3600) / 60) * 6;
  const hoursDegrees = (elapsedTime / 3600) * 30;

  return (
    <div className="flex flex-col items-center justify-center h-auto">
      <div className="relative w-24 h-24 md:w-40 md:h-40 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Stopwatch face */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="white"
            stroke="green"
            strokeWidth="2"
          />

          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
            const x1 = 50 + Math.cos(angle) * 40
            const y1 = 50 + Math.sin(angle) * 40
            const x2 = 50 + Math.cos(angle) * 45
            const y2 = 50 + Math.sin(angle) * 45
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}

          {/* Minute markers */}
          {[...Array(60)].map((_, i) => {
            if (i % 5 !== 0) {
              const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
              const x1 = 50 + Math.cos(angle) * 45
              const y1 = 50 + Math.sin(angle) * 45
              const x2 = 50 + Math.cos(angle) * 47
              const y2 = 50 + Math.sin(angle) * 47
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="gray"
                  strokeWidth="1"
                />
              )
            }
            return null
          })}

          {/* Hour hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${hoursDegrees}, 50, 50)`}
          />

          {/* Minute hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${minutesDegrees}, 50, 50)`}
          />

          {/* Second hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="red"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${secondsDegrees}, 50, 50)`}
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="black" />
        </svg>
      </div>
      <div className="text-2xl md:text-4xl font-mono" aria-live="polite">
        {formatTime(elapsedTime)}
      </div>
    </div>
  )
}

export default Stopwatch;

