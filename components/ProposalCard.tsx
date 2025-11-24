import React, { useState, useEffect } from 'react';

interface ProposalCardProps {
  onYes: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [quote, setQuote] = useState<string>("");
  const [quoteVisible, setQuoteVisible] = useState(false);
  
  const MAX_ATTEMPTS = 15;

  // Static Image URL (Romantic couple under umbrella theme)
  // Using object-cover in CSS to ensure it fills the space as requested
  const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop";

  const yesButtonScale = Math.min(1 + (noCount * 0.1), 3); 

  const playSound = (type: 'yes' | 'no') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'yes') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.error("Audio generation failed", e);
    }
  };
  
  const getTitleText = () => {
    const titles = [
      "এই যে শুনছো? তুমি কি আমার হবে? 🌹",
      "এত তাড়াতাড়ি না করে দিও না! আরেকবার ভাবো! 🤔",
      "প্লিজ না বোলো না! আমি অনেক কষ্ট পাবো! 🥺",
      "ভেবে দেখো একবার! আমাদের জুটিটা কিন্তু দারুণ হবে! 💑",
      "এভাবে ফিরিয়ে দিও না! প্লিজ প্লিজ প্লিজ! 😫",
      "আমার হৃদয়টা কি এভাবেই ভেঙে চুরমার করে দেবে? 💔",
      "তুমি কি চাও আমি সারাজীবন একা থাকি? 😢",
      "আমি কিন্তু সত্যি সত্যি কান্না করে দেবো! আর থামবো না! 😭",
      "দোহাই লাগে তোমার! একবার হ্যাঁ বলো! জীবনটা সুন্দর হয়ে যাবে! 🙏",
      "তুমি কি পাথর? একটু দয়া করো! 🗿",
      "আমার চোখের জল কি তোমায় স্পর্শ করে না? 💧",
      "আমি খাওয়া-দাওয়া ছেড়ে দেবো কিন্তু! 🍛❌",
      "ব্যাস! আমি অজ্ঞান হয়ে যাব এখন! 😵",
      "আর কত পরীক্ষা নেবে আমার? 📝",
      "শেষ বারের মতো বলছি... প্লিজ? 🥺",
      "আর পারছি না... দয়া করে হ্যাঁ বলো! ❤️"
    ];
    return titles[Math.min(noCount, titles.length - 1)];
  };

  const getNoButtonText = () => {
    const phrases = [
      "না", "না, আমি রাজি না", "আরে নাহ!", "বললাম তো, না",
      "একদম না", "না মানে না", "খুবই নাছোড়বান্দা তো!", "যাও তো এখান থেকে",
      "উফফ না!", "বিরক্ত করো না", "না রে বাবা না", "পারবো না",
      "সম্ভব না", "কেন বুঝছো না?", "পাগল নাকি?", "শেষবারের মতো না",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoClick = () => {
    playSound('no');
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    playSound('yes');
    onYes();
  };

  const handleGenerateQuote = () => {
    setQuoteVisible(true);
    const quotes = [
      "তোমার হাসিতেই আমি আমার সম্পূর্ণ পৃথিবী খুঁজে পাই। 😊",
      "তোমাকে ছাড়া আমার প্রতিটি দিন অসম্পূর্ণ মনে হয়। তুমি কি আসবে আমার জীবনে? 🌸",
      "পৃথিবীর কাছে হয়তো তুমি একজন সাধারণ মানুষ, কিন্তু আমার কাছে তুমিই আমার পৃথিবী। 🌍❤️",
      "হাতটা একবার ধরেই দেখো, কথা দিচ্ছি—কখনো ছেড়ে যাবো না। 🤝",
      "আমার সবটুকু ভালোবাসা আর যত্ন দিয়ে তোমাকে আগলে রাখবো, শুধু একবার হ্যাঁ বলো। 💖",
      "তুমি কি জানো? আমার প্রতিটি প্রার্থনায় শুধু তোমার নাম থাকে। 🙏",
      "তোমার ওই মিষ্টি হাসিটা দেখার জন্য আমি হাজার বছর অপেক্ষা করতে পারি। 🥰",
      "তোমাকে পাওয়াটাই হবে আমার জীবনের সবচেয়ে বড় উপহার। 🎁",
      "আমি তোমাকে চাই, আজ, কাল এবং সারা জীবনের জন্য। 💑",
      "তুমি পাশে থাকলে সব কঠিন পথও সহজ মনে হয়। আমার সঙ্গী হবে? ✨",
      "আমার হৃদয়ের প্রতিটি স্পন্দন শুধু তোমার কথাই বলে। 💓",
      "তোমার চোখের গভীরতায় আমি হারিয়ে যেতে চাই বারবার। 👀💕",
      "ভালোবাসা মানে তুমি, আর তুমি মানেই আমার পুরোটা জীবন। 🌹",
      "তোমাকে না পেলে এই জীবনটা গল্পের মতো অসম্পূর্ণ থেকে যাবে। 📖💔",
      "চাঁদের আলো যেমন রাতকে সুন্দর করে, তুমি তেমনি আমার জীবনকে সুন্দর করেছ। 🌙",
      "তোমার সাথে কাটানো প্রতিটি মুহূর্ত আমার কাছে অমূল্য রত্নের মতো। 💎",
      "আমি কবি নই, কিন্তু তোমাকে নিয়ে হাজারটা কবিতা লিখতে পারি। ✍️📜",
      "তোমার সুখের জন্য আমি সবকিছু করতে পারি, শুধু একবার বিশ্বাস করে দেখো। 🤗",
      "আমার সব অভিমান, সব ভালোবাসা, সব আবদার শুধু তোমার কাছেই। 🧡",
      "তোমাকে ভালোবাসা যদি ভুল হয়, তবে আমি আর ঠিক হতে চাই না। ❌❤️",
      "তোমার জন্য অপেক্ষার প্রহরগুলোও আমার কাছে মধুর মনে হয়। ⏳🍯",
      "তুমি শুধু আমার ভালোবাসা নও, তুমি আমার বেঁচে থাকার কারণ। 🧬"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
      <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full border-4 border-pink-200 animate-fade-in transition-all duration-300 flex flex-col items-center">
        
        {/* Hero Image Area - Static, reliable, fills space */}
        <div className="mb-6 overflow-hidden rounded-xl shadow-md h-64 w-full bg-pink-50 flex-shrink-0 relative flex items-center justify-center">
            <img 
              src={HERO_IMAGE_URL}
              alt="Romantic Couple" 
              className="w-full h-full object-cover"
            />
        </div>
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-pink-700 mb-8 leading-relaxed font-handwriting min-h-[4rem] flex items-center justify-center">
          {getTitleText()}
        </h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full min-h-[100px]">
          <button
            onClick={handleYesClick}
            style={{ 
              transform: `scale(${yesButtonScale})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg z-20 transition-all duration-200 text-lg whitespace-nowrap order-2 md:order-1"
          >
            হ্যাঁ 💖
          </button>

          {noCount <= MAX_ATTEMPTS && (
            <button
              onClick={handleNoClick}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-sm text-lg transition-colors duration-200 order-1 md:order-2 border-2 border-gray-300"
            >
              {getNoButtonText()}
            </button>
          )}
        </div>

        {/* Quotes */}
        <div className="mt-8 w-full max-w-sm">
          {!quoteVisible ? (
            <button
              onClick={handleGenerateQuote}
              className="text-sm text-pink-500 hover:text-pink-700 underline decoration-dotted transition-colors font-medium flex items-center justify-center gap-1 mx-auto"
            >
               ✨ আমাকে ইমপ্রেস করার মতো কিছু বলো ✨
            </button>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-200 shadow-sm mt-2 transition-all duration-500 animate-fade-in">
                 <div className="text-gray-700 text-lg whitespace-pre-line italic font-handwriting leading-relaxed">
                   "{quote}"
                 </div>
                 <button 
                  onClick={handleGenerateQuote} 
                  className="text-xs text-pink-400 mt-2 hover:text-pink-600"
                 >
                   (অন্য আরেকটি কথা)
                 </button>
            </div>
          )}
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

export default ProposalCard;