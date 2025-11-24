// This service is currently unused as we switched to static romantic quotes.
// We removed the API dependency to prevent "process is not defined" errors on Netlify/GitHub Pages.

export const generateLovePoem = async (partnerName: string = 'My Love'): Promise<string> => {
  // Return a static fallback just in case this is called anywhere
  return "তোমাকে অনেক ভালোবাসি!";
};