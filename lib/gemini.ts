import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface Message {
 role: string;
 content: string;
}

interface WeatherData {
 main: {
   temp: number;
   humidity: number;
 };
 weather: Array<{
   description: string;
 }>;
 aqi?: number;
}

export async function generateWeatherSummary(weatherData: WeatherData) {
 try {
   const prompt = `Summarize this weather data in simple, non-technical terms that anyone can understand. Include information about the temperature, weather conditions, and air quality index (AQI): ${JSON.stringify(weatherData)}. Explain what the AQI value means for air quality in simple terms.`;
   
   const response = await axios.post(
     `${GEMINI_API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
     {
       contents: [
         {
           role: 'user',
           parts: [{ text: prompt }]
         }
       ],
       generationConfig: {
         temperature: 0.7,
         topK: 40,
         topP: 0.95,
         maxOutputTokens: 1024
       }
     }
   );

   return response.data.candidates[0].content.parts[0].text;
 } catch (error) {
   console.error('Error generating summary:', error);
   return 'Unable to generate weather summary at the moment.';
 }
}

export async function chatWithAI(message: string) {
 try {
   const response = await axios.post(
     `${GEMINI_API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
     {
       contents: [
         {
           role: 'user',
           parts: [{ text: message }]
         }
       ],
       generationConfig: {
         temperature: 0.7,
         topK: 40,
         topP: 0.95,
         maxOutputTokens: 1024
       }
     }
   );
   return response.data.candidates[0].content.parts[0].text;
 } catch (error) {
   console.error('Error in chat:', error);
   return 'Unable to process chat at the moment.';
 }
}

export async function generateChatResponse(messages: Message[]) {
 try {
   const prompt = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
   
   const response = await axios.post(
     `${GEMINI_API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
     {
       contents: [
         {
           role: 'user',
           parts: [{ text: prompt }]
         }
       ],
       generationConfig: {
         temperature: 0.7,
         topK: 40,
         topP: 0.95,
         maxOutputTokens: 1024
       }
     }
   );

   return response.data.candidates[0].content.parts[0].text;
 } catch (error) {
   console.error('Error generating chat response:', error);
   return 'Unable to generate a response at the moment.';
 }
}