// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react'; // React и хуки state, effect
import { Title } from './shared/ui/Title'; // Заголовки
import { Button } from './shared/ui/Button'; // Кнопка
import ColorDivs from './shared/ui/ColorDivs'; // Компонент для цветных блоков (не используется в основном коде)
import ColorfulButtons from './shared/ui/ColorfulButtons'; // Компонент для цветных кнопок (не используется)
import ThemesButtons from './shared/ui/ThemesButtons'; // Кнопки выбора темы
import './app/styles/index.css'; // Общие стили
import { CloseButton } from './shared/ui/CloseButton'; // Кнопка закрытия
import ButtonThemes from './api/mockExample'; // Импорт mock данных (не используется в основном коде)
import Modal from './shared/ui/Modal'; // Модальное окно
import CheckBox from './shared/ui/CheckBox'; // Компонент чекбоксов
import RadioBox from './shared/ui/RadioBox'; // Компонент радиобоксов
import { getWords } from './api/mockApi'; // API функция для получения слов
import { IWord } from './api/types'; // Тип данных для слова
import {
  handleCheckboxChange,
  handleRadioChange,
  MyFormData,
  LengthLabel,
  initialState,
  WordCount,
  handleSendData
} from './shared/handlers/handlers'; // Обработчики и типы

// Основной компонент приложения
export const App: React.FC = () =>  {

  // Инициализация стейта для формы
  const [formData, setFormData] = useState<MyFormData>(initialState);

  // Стейт для списка слов, которые получим
  const [words, setWords] = useState<IWord[]>([]);

  // Стейт для управления отображением модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Стейт для выбранной темы
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Стейт для выбранной темы (topic)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Стейт для значения радиобокса
  const [radioValue, setRadioValue] = useState<string>('option1');

  // Варианты для кнопок — создание массива из 20 элементов
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({ label: `Кнопка ${i + 1}` }));

  // Стейт для выбранных длин слов (массива)
  const [selectedLengths, setSelectedLengths] = React.useState<string[]>([]);

  // Стейт для числа слов (варианта "Много" по умолчанию)
  const [count, setCount] = useState<WordCount>('Много');

  // useEffect, логирующий слова когда они меняются
  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

  // Обработчик выбора темы
  const handleThemeSelect = (
    theme: string,
    setFormData: React.Dispatch<React.SetStateAction<MyFormData>>,
    setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Обновляем выбранную тему
    setSelectedTopic(theme);
    // Обновляем formData, присваивая тему
    setFormData(prev => ({ ...prev, topic: theme }));
    // Открываем модальное окно
    setIsModalOpen(true);
  };

  // Обработчик чекбоксов по длине слова
  const handleCheckbox = (field: string, checked: boolean) => {
    setFormData(prev => {
      let newSelected = [...prev.selectedLength];
      const label = field === 'lengthShort' ? 'Короткое' :
                    field === 'lengthMedium' ? 'Среднее' :
                    'Длинное';

      if (checked) {
        if (!newSelected.includes(label)) {
          newSelected.push(label); // добавляем, если не было
        }
      } else {
        newSelected = newSelected.filter(item => item !== label); // удаляем
      }

      return { ...prev, [field]: checked, selectedLength: newSelected };
    });
  };

  // Обработчик радиобокса
  const handleRadio = (value: string) => {
    setRadioValue(value); // обновляем выбранное значение радиобокса
    handleRadioChange(setFormData)(value); // вызываем обработчик (он, возможно, тоже обновляет formData)
  };

  // Обработка нажатия кнопки "Отправить"
  const handleClickSend = () => {
    const topic = formData.topic; // получаем текущую тему из формы
    // если есть выбранные длины, используем их, иначе 'все'
    const lengthFilter = selectedLengths.length > 0 ? selectedLengths : 'все';

    // вызов API для получения слов
    getWords(topic, formData.selectedLength, count)
      .then((words) => {
        console.log('Полученные слова:', words);
        if (words.length === 0) {
          alert('Тема не найдена или слова отсутствуют для выбранных условий.');
        }
        setWords(words); // сохраняем слова в стейт
      })
      .catch((error) => {
        console.error('Ошибка при получении слов:', error);
        alert('Произошла ошибка при запросе к серверу.');
      });
  };

  // Логирование текущих значений для debug
  console.log('topic:', formData.topic);
  console.log('lengths:', selectedLengths);
  console.log('count:', count);

  return (
    <div style={{ padding: 20 }}>
      
         {/* ThemesButtons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ThemesButtons</h3>
  <ThemesButtons
  onThemeSelect={(theme) =>
    handleThemeSelect(theme, setFormData, setSelectedTopic, setIsModalOpen)
  }
/>
      </div>

      {/* Кнопка открытия модального */}
      <div style={{ marginBottom: '20px' }}>
        <p>Кнопка для открытия модального окна</p>
        <button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</button>
      </div>

      {/* Радиобокс */}
<div style={{ marginBottom: '20px' }}>
  <h3>Выберите опцию:</h3>
  <RadioBox
    options={[
      { label: 'немного', value: 'немного' },
      { label: 'много', value: 'много' },
      { label: 'все', value: 'все' },
    ]}
    selectedValue={radioValue}
    onChange={handleRadio}
    name="sampleRadio"
    disabled={false}
  />
</div>

      {/* Выбор по длине */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Выберите длину слов:</h4>
        <CheckBox
  label="Короткие"
  checked={formData.lengthShort}
  onChange={(value: boolean) => {
     handleCheckbox('lengthShort', value);
    setFormData(prev => {
      let newSelected = [...prev.selectedLength];
      if (value) {
        // добавляем элемент
        if (!newSelected.includes('Короткое')) {
          newSelected.push('Короткое');
        }
      } else {
        // удаляем элемент
        newSelected = newSelected.filter(item => item !== 'Короткое');
      }
      return { ...prev, selectedLength: newSelected };
    });
  }}
/>

<CheckBox
  label="Средние"
  checked={formData.lengthMedium}
  onChange={(value: boolean) => {
    
 handleCheckbox('lengthMedium', value);
    setFormData(prev => {
      let newSelected = [...prev.selectedLength];
      if (value) {
        // добавляем элемент
        if (!newSelected.includes('Среднее')) {
          newSelected.push('Среднее');
        }
      } else {
        // удаляем элемент
        newSelected = newSelected.filter(item => item !== 'Среднее');
      }
      return { ...prev, selectedLength: newSelected };
    });
  }}
/>



<CheckBox
  label="Длинные"
  checked={formData.lengthLong}
  onChange={(value: boolean) => {
    
 handleCheckbox('lengthLong', value);
    setFormData(prev => {
      let newSelected = [...prev.selectedLength];
      if (value) {
        // добавляем элемент
        if (!newSelected.includes('Длинное')) {
          newSelected.push('Длинное');
        }
      } else {
        // удаляем элемент
        newSelected = newSelected.filter(item => item !== 'Длинноее');
      }
      return { ...prev, selectedLength: newSelected };
    });
  }}
/>


        {/* Кнопка отправки */}
        <div style={{ marginTop: '40px' }}>
          <Button onClick={handleClickSend}>Отправить запрос на сервер</Button>
        </div>

        {/* Результаты */}
        {words.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Результаты:</h4>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word.word}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

            {/* Модальное окно */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Модальное окно</h3>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Тема выбрана"
          modalType="option"
        >
          <p>Вы выбрали тему: {selectedTopic}</p>
        </Modal>
      </div>

            {/* ThemesButtons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ThemesButtons</h3>
<ThemesButtons
  onThemeSelect={(theme) =>
    handleThemeSelect(theme, setFormData, setSelectedTopic, setIsModalOpen)
  }
/>
      </div>
      
      
      {/* Модальное окно */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Модальное окно</h3>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Тема выбрана"
          modalType="option"
        >
          <p>Вы выбрали тему: {selectedTopic}</p>
        </Modal>
      </div>

        {/* Заголовки */}
      <div style={{ marginBottom: '20px' }}>
        <Title as="h1">Заголовок</Title>
        <Title as="h2">Чередование цвета для списка кнопок</Title>
      </div>

    

         {/* Close buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Закрытие)</h3>
        <CloseButton
          actionType="close"
          onClose={() => console.log('Закрытие модалки')}
        />
      </div>


          <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Выход)</h3>
        <CloseButton
          actionType="exit"
          onExit={() => console.log('Выход из приложения')}
        />
      </div>

     
      {/* Модальное окно */}
      <Modal isOpen={isModalOpen} modalType="option" onClose={() => setIsModalOpen(false)}>
        {/* Тут можно разместить содержимое модалки */}
        <CloseButton onClick={() => setIsModalOpen(false)} />
        <h2>Модальное окно</h2>
        {/* Например, можно разместить сюда форму или другую логику */}
      </Modal>
      
    
      
    </div>
  );
};