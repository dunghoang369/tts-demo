import { useState, useEffect } from 'react';
import { getVoices, getModels } from '../api/ttsService';
import './SettingsPanel.css';

function SettingsPanel({ 
  voice, 
  setVoice, 
  model, 
  setModel
}) {
  const [voices, setVoices] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    loadVoicesAndModels();
  }, []);

  const loadVoicesAndModels = async () => {
    try {
      setLoading(true);
      const [voicesData, modelsData] = await Promise.all([
        getVoices(),
        getModels()
      ]);
      
      setVoices(voicesData);
      setModels(modelsData);
      
      // Set default selections
      if (voicesData.length > 0 && !voice) {
        setVoice(voicesData[0].id);
      }
      if (modelsData.length > 0 && !model) {
        setModel(modelsData[0].id);
      }
    } catch (error) {
      console.error('Failed to load voices and models:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-panel">
      <div className="settings-tabs">
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {activeTab === 'settings' ? (
        <div className="settings-content">
          {/* Voice Selection */}
          <div className="setting-group">
            <label className="setting-label">Voice</label>
            {loading ? (
              <div className="loading-placeholder">Loading voices...</div>
            ) : (
              <select
                id="voice-select"
                className="setting-select"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                {voices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Model Selection */}
          <div className="setting-group">
            <label className="setting-label">Model</label>
            {loading ? (
              <div className="loading-placeholder">Loading models...</div>
            ) : (
              <select
                id="model-select"
                className="setting-select"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      ) : (
        <div className="history-content">
          <div className="empty-state">
            <p>No history yet</p>
            <p className="empty-state-subtitle">Your generated audio will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;
