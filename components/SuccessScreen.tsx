import React, { useState, useEffect } from 'react';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  const [quote, setQuote] = useState<string>("");
  const [showQuote, setShowQuote] = useState(false);

  // Static Image URL (Romantic couple under umbrella theme)
  const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop";

  // Play a happy melody using Web Audio API
  const playCelebrationSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      
      notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          const startTime = ctx.currentTime + (index * 0.15);
          
          osc.type = 'sine';
          osc.frequency.value = freq;
          
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.00001, startTime + 1.5);
          
          osc.start(startTime);
          osc.stop(startTime + 1.5);
      });
    } catch (e) {
      console.error("Audio generation failed", e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    playCelebrationSound();
  }, []);

  const handleGenerateQuote = () => {
    setShowQuote(true);
    const quotes = [
      "তোমার হাত ধরেই আমি বার্ধক্যে পৌঁছাতে চাই। 👵👴",
      "ভালোবাসা মানে শুধু বলা নয়, ভালোবাসা মানে তোমাকে অনুভব করা। ❤️",
      "আজ থেকে আমার সব আনন্দ, সব সুখ শুধু তোমার জন্য। 🎉",
      "ধন্যবাদ আমার জীবনে আসার জন্য। তুমি আমার জীবনের শ্রেষ্ঠ উপহার। 🎁",
      "কথা দিচ্ছি, কোনোদিন তোমাকে একা হতে দেবো না। 🤝",
      "চলো দুজনে মিলে একটা সুন্দর পৃথিবী গড়ে তুলি। 🌍",
      "তোমার হাসিমুখটা দেখলেই আমার সব ক্লান্তি দূর হয়ে যায়। 😊",
      "সারাটা জীবন এভাবেই ভালোবাসতে চাই তোমাকে। 🥰"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-red-300 relative overflow-hidden">
        
        {/* Confetti-like decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"></div>

        <div className="mb-6 animate-bounce">
          <span className="text-6xl">💑</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-6 leading-tight font-handwriting">
          ইয়েসসসসস! 🎉
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-800 font-semibold mb-8 leading-relaxed">
          "হ্যাঁ হ্যাঁ আমি আগে থেকেই জানতাম তুমি আমাকে ভালোবাসো! 😍"
        </p>

        <div className="mb-8 overflow-hidden rounded-xl shadow-lg h-64 w-full bg-pink-50 flex-shrink-0 relative flex items-center justify-center">
            <img 
              src={HERO_IMAGE_URL}
              alt="Happy Couple" 
              className="w-full h-full object-cover"
            />
        </div>

        <div className="space-y-4">
          {!showQuote ? (
            <button
              onClick={handleGenerateQuote}
              className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              <span>✨</span> ভালোবাসার কিছু কথা ✨
            </button>
          ) : (
            <div className="bg-pink-50 p-6 rounded-xl border border-pink-200 mt-4 animate-fade-in">
              <h3 className="text-pink-800 font-bold mb-2">মনের কথা:</h3>
              <p className="text-gray-700 whitespace-pre-line italic font-handwriting text-lg">
                "{quote}"
              </p>
              <button 
                  onClick={handleGenerateQuote} 
                  className="text-xs text-pink-400 mt-4 hover:text-pink-600 underline"
                 >
                   অন্য আরেকটি কথা দেখুন
              </button>
            </div>
          )}

          <button
            onClick={onReset}
            className="text-gray-400 hover:text-gray-600 text-sm mt-8 underline decoration-dotted"
          >
            প্রথম থেকে শুরু করুন
          </button>
        </div>
      </div>
      
      {/* Watermark moved here */}
      <div className="mt-4 opacity-50 hover:opacity-80 transition-opacity duration-300">
        <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-widest uppercase drop-shadow-sm font-sans">
          MADE WITH 4 FLAG/MR NIME
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;