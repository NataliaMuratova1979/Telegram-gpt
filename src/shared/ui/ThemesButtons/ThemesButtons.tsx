import React, { useState, useEffect } from 'react';
import { getTopics } from '../../../api/mockApi';
import { Button } from '../Button';

const ThemesButtons = () => {
  const [themes, setThemes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Загрузить темы при монтировании
  useEffect(() => {
    getTopics().then((topics) => {
      setThemes(topics.map(t => t.topic));
    });
  }, []);

  // Загрузка цветов, как в ColorfulButtons
  useEffect(() => {
    const colorVars = [
      '--tag-color-pale-1',
      '--tag-color-pale-2',
      '--tag-color-pale-3',
      '--tag-color-pale-4',
      '--tag-color-pale-5',
    ];
    const styles = getComputedStyle(document.documentElement);
    const retrievedColors = colorVars.map((varName) => styles.getPropertyValue(varName).trim());
    setColors(retrievedColors);
  }, []);

  // Создаём массив индексов для кнопок
  const indices = Array.from({ length: themes.length }, (_, i) => i);

  return (
    <div>
      {/* Отображаем темы как цветные кнопки */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {themes.map((theme, i) => (
          <Button purpose="select-option"
            key={i}
            type="colorful"
            index={i}
              style={{
              minWidth: '120px',
              padding: '8px',
              backgroundColor: colors[i % colors.length], // для демонстрации
              color: 'black', // черный текст
            }}
          >
            {theme}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemesButtons;