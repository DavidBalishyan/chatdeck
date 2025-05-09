import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Platform = 'twitch' | 'youtube' | 'kick';

interface Props {
  onSubmit: (usernameOrId: string, platform: Platform) => void;
}

export const UsernameForm: React.FC<Props> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [platform, setPlatform] = useState<Platform>('twitch');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim(), platform);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      <h1 className="text-2xl font-bold text-center">Choose Platform & Enter Info</h1>
      
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={() => setPlatform('twitch')}
          className={`px-4 py-2 rounded-xl ${
            platform === 'twitch' ? 'bg-purple-600' : 'bg-gray-700'
          }`}
        >
          Twitch
        </button>
        <button
          type="button"
          onClick={() => setPlatform('youtube')}
          className={`px-4 py-2 rounded-xl ${
            platform === 'youtube' ? 'bg-red-600' : 'bg-gray-700'
          }`}
        >
          YouTube
        </button>
        <button
          type="button"
          onClick={() => setPlatform('kick')}
          className={`px-4 py-2 rounded-xl ${
            platform === 'kick' ? 'bg-green-600' : 'bg-gray-700'
          }`}
        >
          Kick
        </button>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          platform === 'youtube'
            ? 'Enter YouTube Live Video ID'
            : 'Enter your Username'
        }
        className="px-4 py-2 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-xl text-lg font-semibold"
      >
        Load Chat
      </motion.button>
    </motion.form>
  );
};
