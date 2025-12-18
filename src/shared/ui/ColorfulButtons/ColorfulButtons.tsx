import React from 'react';
import { Button } from '../Button';

const ColorfulButtons = () => {
  const [colors, setColors] = React.useState<string[]>([]);

  const colorVars = [
    '--tag-color-pale-1',
    '--tag-color-pale-2',
    '--tag-color-pale-3',
    '--tag-color-pale-4',
    '--tag-color-pale-5',
  ];

  React.useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const retrievedColors = colorVars.map((varName) =>
      styles.getPropertyValue(varName).trim()
    );
    setColors(retrievedColors);
  }, []);

  const count = 30; // число кнопок
  const indices = Array.from({ length: count }, (_, i) => i);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {indices.map((i) => {
        const color = colors[i % colors.length];
        return (
          <Button
            key={i}
            type="colorful"
            index={i}
            purpose="select-option"
            style={{
              width: '120px',
              height: '40px',
              backgroundColor: color,
            }}
          >
            Кнопка {i + 1}
          </Button>
        );
      })}
    </div>
  );
};

export default ColorfulButtons;