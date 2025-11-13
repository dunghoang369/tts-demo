import { useState } from 'react'
import TextEditor from './components/TextEditor'
import SettingsPanel from './components/SettingsPanel'
import { synthesize } from './api/ttsService'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { user, logout } = useAuth();
  const [voice, setVoice] = useState('');
  const [model, setModel] = useState('');
  const [rate, setRate] = useState('1.0');
  const [isLoading, setIsLoading] = useState(false);

  const handleSynthesize = async (text) => {
    try {
      setIsLoading(true);
      const { audioUrl } = await synthesize(text, voice, model, rate);
      return audioUrl;
    } catch (error) {
      console.error('Synthesis failed:', error);
      alert('Failed to synthesize speech. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="logo">🔊</span>
          <h1 className="title">Text to Speech</h1>
        </div>
        <div className="user-section">
          <span className="username">👤 {user?.email || user?.username}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="main-layout">
        <div className="editor-section">
          <TextEditor 
            onSynthesize={handleSynthesize}
            isLoading={isLoading}
          />
        </div>
        
        <aside className="settings-section">
          <SettingsPanel 
            voice={voice}
            setVoice={setVoice}
            model={model}
            setModel={setModel}
            rate={rate}
            setRate={setRate}
          />
        </aside>
      </main>
    </div>
  )
}

export default App
