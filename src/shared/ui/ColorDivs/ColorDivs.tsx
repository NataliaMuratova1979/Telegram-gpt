import React from 'react';

const ColorDivs = () => {
  const [colors, setColors] = React.useState<string[]>([]);

  // Названия CSS-переменных
  const colorVars = [
    '--tag-color-pale-1',
    '--tag-color-pale-2',
    '--tag-color-pale-3',
    '--tag-color-pale-4',
    '--tag-color-pale-5',
  ];

  React.useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const retrievedColors = colorVars.map((varName) => styles.getPropertyValue(varName).trim());
    setColors(retrievedColors);
  }, []);

  // Количество div, которые хотите отобразить
  const count = 30; // например, 30 элементов

  // Генерируем массив индексов для циклического чередования цветов
  const indices = Array.from({ length: count }, (_, i) => i);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {indices.map((i) => {
        const color = colors[i % colors.length]; // чередуем цвета
        return (
          <div
            key={i}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: color,
              border: '1px solid #000',
              borderRadius: '8px',
            }}
          />
        );
      })}
    </div>
  );
};

export default ColorDivs;