import React, { useState, useEffect } from 'react';
import { getTopics } from '../../../api/mockApi';
import { Button } from '../Button';

interface ThemesButtonsProps {
  onThemeSelect: (theme: string) => void;
}

const ThemesButtons: React.FC<ThemesButtonsProps> = ({ onThemeSelect }) => {
  const [themes, setThemes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Загружаем темы
  useEffect(() => {
    getTopics().then((topics) => {
      setThemes(topics.map(t => t.topic));
    });
  }, []);

  // Получаем CSS-переменные цветов
  useEffect(() => {
    const colorVars = [
      '--tag-color-pale-1',
      '--tag-color-pale-2',
      '--tag-color-pale-3',
      '--tag-color-pale-4',
      '--tag-color-pale-5',
      '--tag-color-pale-5',
    ];
    const styles = getComputedStyle(document.documentElement);
    const retrievedColors = colorVars.map((varName) => styles.getPropertyValue(varName).trim());
    setColors(retrievedColors);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {themes.map((theme, i) => {
          // Если цвета еще не загружены, используем дефолтный цвет
          const bgColor = colors.length > 0 ? colors[i % colors.length] : '#ccc';

          return (
            <Button
              key={i}
              purpose="select-option"
              variant = "colorful"
              index={i}             
              style={{
                minWidth: '120px',
                padding: '8px',
                backgroundColor: bgColor,
                color: 'black',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => {
                onThemeSelect(theme);
              }}
            >
              {theme}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemesButtons;