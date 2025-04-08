import React from 'react';
import { QRHistory } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface Props {
  history: QRHistory[];
  onSelect: (item: QRHistory) => void;
  onClear: () => void;
}

export function History({ history, onSelect, onClear }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
          <Clock className="w-5 h-5" />
          History
        </h2>
        <button
          onClick={onClear}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <p className="font-medium truncate dark:text-white">{item.options.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}