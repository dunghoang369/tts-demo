// Vietnamese TTS API Service
// Integrated with http://115.79.192.192:19977/invocations

/**
 * Synthesizes speech from text using the specified voice, model, rate, return type, and audio format
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice ID to use
 * @param {string} model - The model ID to use
 * @param {string} rate - The speed of the speech
 * @param {string} returnType - The return type (url or file)
 * @param {string} audioFormat - The audio format (wav or mp3)
 * @returns {Promise<{audioUrl: string, blob: Blob}>} - Audio URL and blob
 */
export async function synthesize(text, voice, model, rate, returnType, audioFormat) {
  console.log('TTS API called with:', { text, voice, model, rate, returnType, audioFormat });
  
  // New API endpoint
  const API_URL = 'http://115.79.192.192:19977/invocations';
  const API_KEY = 'zNBVyiatKn5eTvC2CEvDg1msgOCHrTZ55zZ0qfsu';
  
  // Build JSON body for the real API
  const requestBody = {
    content: text,
    rate: parseFloat(rate) || 1.0,
    sample_rate: parseInt(model) || 16000,
    accent: parseInt(voice) || 1,
    return_type: returnType || 'url',
    audio_format: audioFormat || 'wav'
  };
  
  console.log('Request body:', requestBody);
  
  // Call real TTS API with POST
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`TTS API failed: ${response.status}`);
  }
  
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  
  return { audioUrl, blob };
}

/**
 * Fetch available speech rates (speeds)
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getRates() {
  console.log('getRates API called');
  
  // Return available speech rates for the TTS API
  return [
    { id: '0.8', name: '0.8x (Very Slow)' },
    { id: '0.9', name: '0.9x (Slow)' },
    { id: '1.0', name: '1.0x (Normal)' },
    { id: '1.1', name: '1.1x (Fast)' },
    { id: '1.2', name: '1.2x (Very Fast)' },
  ];
}

/**
 * Fetch available voices from the backend
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getVoices() {
  console.log('getVoices API called');
  
  // Return Vietnamese voices available from the TTS API
  return [
    { id: '1', name: 'Hannah (Nữ miền Nam - Vi - Chất lượng thấp)' },
    { id: '2', name: 'Thu Thuỷ (Nữ miền Bắc - Vi - Chất lượng thấp)' },
    { id: '3', name: 'Kim Chi (Nữ miền Bắc - Vi)' },
    { id: '4', name: 'Hồng Phượng (Nữ miền Bắc - Vi)' },
    { id: '5', name: 'Phương Anh (Nữ miền Nam - Vi)' },
    { id: '6', name: 'Sơn Long (Nam miền bắc - Vi)' },
    { id: '7', name: 'Cẩm Tú (Nữ miền Trung - Vi)' },
    { id: '8', name: 'Hồng Phúc (Nam miền Nam - Vi)' },
    { id: '9', name: 'LJSpeech (Nữ - En - Thử nghiệm)' }
  ];
}

/**
 * Fetch available models (sample rates) from the backend
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getModels() {
  console.log('getModels API called');
  
  // Return available sample rates for the TTS API
  return [
    { id: '8000', name: '8kHz (Low Quality)' },
    { id: '16000', name: '16kHz (Standard)' },
    { id: '22050', name: '22kHz (High Quality)' },
    { id: '44100', name: '44kHz (Premium)' }
  ];
}

/**
 * Fetch available return types
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getReturnTypes() {
  console.log('getReturnTypes API called');
  
  // Return available return types for the TTS API
  return [
    { id: 'url', name: 'URL' },
    { id: 'file', name: 'File' }
  ];
}

/**
 * Fetch available audio formats
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getAudioFormats() {
  console.log('getAudioFormats API called');
  
  // Return available audio formats for the TTS API
  return [
    { id: 'wav', name: 'WAV' },
    { id: 'mp3', name: 'MP3' }
  ];
}
