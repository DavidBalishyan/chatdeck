import React, { useRef } from "react";
import { motion } from "framer-motion";

type Platform = "twitch" | "youtube" | "kick";

interface Props {
  usernameOrId: string;
  platform: Platform;
  onReset: () => void;
}

export const ChatViewer: React.FC<Props> = ({
  usernameOrId,
  platform,
  onReset,
}) => {
  const parent = window.location.hostname;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  let chatUrl = "";
  if (platform === "twitch") {
    chatUrl = `https://www.twitch.tv/embed/${usernameOrId}/chat?parent=${parent}`;
  } else if (platform === "youtube") {
    chatUrl = `https://www.youtube.com/live_chat?v=${usernameOrId}&embed_domain=${parent}`;
  } else if (platform === "kick") {
    chatUrl = `https://kick.com/embed/chat/${usernameOrId}`;
  }

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-2xl p-4 shadow-lg flex flex-col items-center"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      <h2 className="text-xl font-bold mb-4 capitalize">
        {platform} Chat {platform !== "youtube" && `for @${usernameOrId}`}
      </h2>
      <iframe
        ref={iframeRef}
        src={chatUrl}
        height="500"
        width="350"
        className="rounded-xl border-none mb-4"
        title="Chat"
        allowFullScreen
      />
      <div className="flex gap-2">
        <motion.button
          onClick={handleFullscreen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-4 rounded-xl text-sm font-semibold"
        >
          Fullscreen Chat
        </motion.button>
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 transition-colors py-2 px-4 rounded-xl text-sm font-semibold"
        >
          Change Platform/Username
        </motion.button>
      </div>
      {platform === "kick" && (
        <p className="text-yellow-400 text-sm text-center mb-2">
          ⚠️ Kick chat embeds may fail even if the streamer is live.
          <a
            href={`https://kick.com/${usernameOrId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            Open chat directly
          </a>
        </p>
      )}
    </motion.div>
  );
};
