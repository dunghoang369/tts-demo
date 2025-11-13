// Vietnamese TTS API Service
// Integrated with https://aft.namisense.ai/tts/offline

/**
 * Synthesizes speech from text using the specified voice, model, and rate
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice ID to use
 * @param {string} model - The model ID to use
 * @param {string} rate - The speed of the speech
 * @returns {Promise<{audioUrl: string, blob: Blob}>} - Audio URL and blob
 */
export async function synthesize(text, voice, model, rate) {
  console.log('TTS API called with:', { text, voice, model, rate });
  
  // Build query parameters for the real API
  const params = new URLSearchParams({
    text: text,
    accent: voice || '01_hannah',
    sample_rate: model || '16000',
    audio_format: 'wav',
    rate: rate || '1.0'
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
 * Fetch available speech rates (speeds)
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export async function getRates() {
  console.log('getRates API called');
  
  // Return available speech rates for the TTS API
  return [
    { id: '0.5', name: '0.5x (Very Slow)' },
    { id: '0.75', name: '0.75x (Slow)' },
    { id: '1.0', name: '1.0x (Normal)' },
    { id: '1.25', name: '1.25x (Fast)' },
    { id: '1.5', name: '1.5x (Very Fast)' },
    { id: '2.0', name: '2.0x (Ultra Fast)' }
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
    { id: '01_hannah', name: 'Hannah (Nữ miền Nam - Vi - Chất lượng thấp)' },
    { id: '02_thuthuy', name: 'Thu Thuỷ (Nữ miền Bắc - Vi - Chất lượng thấp)' },
    { id: '03_kimchi', name: 'Kim Chi (Nữ miền Bắc - Vi)' },
    { id: '04_hongphuong', name: 'Hồng Phượng (Nữ miền Bắc - Vi)' },
    { id: '05_phuonganh', name: 'Phương Anh (Nữ miền Nam - Vi)' },
    { id: '06_sonlong', name: 'Sơn Long (Nam miền bắc - Vi)' },
    { id: '07_camtu', name: 'Cẩm Tú (Nữ miền Trung - Vi)' },
    { id: '08_hongphuc', name: 'Hồng Phúc (Nam miền Nam - Vi)' },
    { id: '09_ljspeech', name: 'LJSpeech (Nữ - En - Thử nghiệm)' }
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


