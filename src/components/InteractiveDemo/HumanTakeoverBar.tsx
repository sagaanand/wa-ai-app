import React from 'react';
import { Bot, User } from 'lucide-react';

interface HumanTakeoverBarProps {
  isAiMode: boolean;
  onToggleAiMode: () => void;
}

export const HumanTakeoverBar: React.FC<HumanTakeoverBarProps> = ({
  isAiMode,
  onToggleAiMode,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Mode Status */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            isAiMode
              ? 'bg-namnilam-50 text-namnilam-700 border border-namnilam-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {isAiMode ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              AI Mode:
            </span>
            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                isAiMode
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isAiMode ? 'ON' : 'OFF (Manual)'}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            {isAiMode ? 'AI is handling conversations' : 'You are now replying'}
          </p>
        </div>
      </div>

      {/* Right: Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleAiMode}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
            isAiMode
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-namnilam-800 hover:bg-namnilam-900 text-white'
          }`}
        >
          {isAiMode ? (
            <>
              <User className="w-3.5 h-3.5" />
              <span>Take Over Chat</span>
            </>
          ) : (
            <>
              <Bot className="w-3.5 h-3.5 text-emerald-300" />
              <span>Hand back to AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
