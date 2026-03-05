import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  borderRadius: string;
  fontSans: string;
  siteName: string;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => Promise<void>;
  loading: boolean;
}

const defaultSettings: ThemeSettings = {
  primaryColor: '#4fc3d0',
  secondaryColor: '#3d35b5',
  accentColor: '#1a8080',
  backgroundColor: '#071525',
  borderRadius: '24px',
  fontSans: 'Inter',
  siteName: 'ElitePro',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--dark-label-dot', settings.primaryColor);
    root.style.setProperty('--section-dot', settings.primaryColor);
    root.style.setProperty('--hero-btn', settings.secondaryColor);
    root.style.setProperty('--hero-btn-shadow', `${settings.secondaryColor}80`);
    root.style.setProperty('--triangle-bottom', settings.primaryColor);
    root.style.setProperty('--triangle-top', settings.accentColor);
    root.style.setProperty('--font-sans', `"${settings.fontSans}", ui-sans-serif, system-ui, sans-serif`);
    root.style.setProperty('--dark-bg-color', settings.backgroundColor);
    root.style.setProperty('--global-radius', settings.borderRadius);
    
    // Update document title
    document.title = `${settings.siteName} | Strategic Event Production`;
  }, [settings]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<ThemeSettings>) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (response.ok) {
        setSettings(prev => ({ ...prev, ...newSettings }));
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
