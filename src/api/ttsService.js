// Vietnamese TTS API Service
// Integrated with https://aft.namisense.ai/tts/offline

/**
 * Synthesizes speech from text using the specified voice and model
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice ID to use
 * @param {string} model - The model ID to use
 * @returns {Promise<{audioUrl: string, blob: Blob}>} - Audio URL and blob
 */
export async function synthesize(text, voice, model) {
  console.log('TTS API called with:', { text, voice, model });
  
  // Build query parameters for the real API
  const params = new URLSearchParams({
    text: text,
    accent: voice || '01_hannah',
    sample_rate: model || '16000',
    audio_format: 'wav'
  });
  
  // Call real TTS API
  const response = await fetch(`https://aft.namisense.ai/tts/offline?${params}`);
  
  if (!response.ok) {
    throw new Error(`TTS API failed: ${response.status}`);
  }
  
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  
  return { audioUrl, blob };
}

/**
 * Fetch available voices from the backend
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getVoices() {
  console.log('getVoices API called');
  
  // Return Vietnamese voices available from the TTS API
  return [
    { id: '01_hannah', name: 'Hannah' },
    { id: '02_thuthuy', name: 'Thu Thủy' },
    { id: '03_kimchi', name: 'Kim Chi' },
    { id: '04_hongphuong', name: 'Hồng Phượng' },
    { id: '05_phuonganh', name: 'Phương Anh' },
    { id: '06_sonlong', name: 'Sơn Long' }
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


