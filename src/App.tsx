import React, { useState } from 'react';
import { UsernameForm } from './components/UsernameForm';
import { ChatViewer } from './components/ChatViewer';
import { motion, AnimatePresence } from 'framer-motion';

type Platform = 'twitch' | 'youtube' | 'kick';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [usernameOrId, setUsernameOrId] = useState<string | null>(null);

  const handleSet = (value: string, platform: Platform) => {
    setPlatform(platform);
    setUsernameOrId(value);
  };

  const handleReset = () => {
    setPlatform(null);
    setUsernameOrId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <AnimatePresence>
        {!usernameOrId ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-md"
          >
            <UsernameForm onSubmit={handleSet} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg"
          >
            <ChatViewer
              usernameOrId={usernameOrId}
              platform={platform!}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
