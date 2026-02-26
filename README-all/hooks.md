Основная идея и структура

Выбор темы, длины и количества слов – форма с выбором.
Загрузка массива слов – fetch-запрос к серверу.
Генерация случайных слов согласно выбранным параметрам.
Отображение по одному слову.
Обработка ответов пользователя (правильное или неправильное).
Обновление состояния для следующего слова и подсчет результатов.

Какие хуки использовать и как

useState	Хранение состояния (выбор темы, длины, слов, текущего слова, счетчиков)	const [theme, setTheme] = useState('');

useEffect	Загрузка массива слов с сайта при монтировании компонента или при изменении темы/длинны/количества	useEffect(() => { fetchWords(); }, [theme, length, count]);

useRef	Для хранения текущего слова без постоянного рендера, например для сравнения	const currentWordRef = useRef(null);

useCallback	Объявление функций, которые не будут пересоздаваться при каждом рендере.	const handleNextWord = useCallback(() => { ... }, [dependecies]);

useMemo	Мемоизация вычисленных данных (например, случайных слов), чтобы не пересчитывать на каждом рендере	const filteredWords = useMemo(() => { ... }, [words, filters]);

import React, { useState, useEffect, useRef, useCallback } from 'react';

function App() {
  const [theme, setTheme] = useState('');
  const [length, setLength] = useState('');
  const [wordCount, setWordCount] = useState(10);
  const [allWords, setAllWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResult, setShowResult] = useState(null); // правильное или неправильное
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const currentWordRef = useRef(null);

  // Загрузка слов
  useEffect(() => {
    fetch('https://example.com/words') // заменить на ваш сайт
      .then(res => res.json())
      .then(data => {
        setAllWords(data);
      });
  }, []);

  // Генерация набора слов по выбранным параметрам
  const generateWords = useCallback(() => {
    if (!allWords.length) return;
    const filtered = allWords.filter(word => {
      // логика фильтрации по теме, длине и т.п.
      return true; // placeholder
    });
    const shuffled = shuffleArray(filtered).slice(0, wordCount);
    setShuffledWords(shuffled);
    setCurrentWordIndex(0);
    setShowResult(null);
  }, [allWords, wordCount, theme, length]);

  // Перемешивание массива
  const shuffleArray = (array) => {
    // алгоритм Fisher-Yates
  };

  // Обработка выбора правильного или неправильного
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setShowResult(isCorrect);
  };

  // Переход к следующему слову
  const handleNext = () => {
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowResult(null);
    } else {
      alert('Тест завершен!');
    }
  };

  // Используйте useEffect, чтобы обновлять текущие слово
  useEffect(() => {
    if (shuffledWords.length > 0) {
      currentWordRef.current = shuffledWords[currentWordIndex];
    }
  }, [currentWordIndex, shuffledWords]);

  return (
    <div>
      {/* Форма выбора темы, длины, количества */}
      {/* Кнопка начать тест */}
      {/* Отображение текущего слова */}
      {/* Кнопки для выбора правильности */}
      {/* Отображение результата и статистики */}
    </div>
  );
}

Итог
Основные хуки: useState для состояния, useEffect для загрузки и реакций, useRef для текущего слова.
Можно добавлять useCallback и useMemo для оптимизации.
Главное — правильно управлять состоянием текущего слова и переходом к следующему.


Идея взаимодействия
В первой странице пользователь выбирает тему.
После выбора открывается ModalThemeAndSettings, где выбирается длина и число слов.
После подтверждения вызывается WordsQuizModal, где отображаются слова, и пользователь указывает правильное или неправильное.
В конце — результаты или новые слова.

import React, { useState } from 'react';

// Компонент первой страницы
function MainPage() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setShowSettingsModal(true); // открываем настройки
  };

  // После установки настроек, вызываем модальное для слов
  const startQuiz = () => {
    setShowSettingsModal(false);
    setShowWordsModal(true);
  };

  return (
    <div>
      <h1>Выберите тему</h1>
      {/* Пример кнопок тем */}
      <button onClick={() => handleThemeSelect('Фрукты')}>Фрукты</button>
      <button onClick={() => handleThemeSelect('Животные')}>Животные</button>

      {showSettingsModal && (
        <ModalThemeAndSettings
          onClose={() => setShowSettingsModal(false)}
          onStart={startQuiz}
        />
      )}

      {showWordsModal && (
        <WordsQuizModal
          theme={selectedTheme}
          onClose={() => setShowWordsModal(false)}
        />
      )}
    </div>
  );
}

// Модальное окно для выбора длины и количества слов
function ModalThemeAndSettings({ onClose, onStart }) {
  const [length, setLength] = useState(''); // длина слова
  const [wordCount, setWordCount] = useState(10); // по умолчанию

  const handleSubmit = () => {
    // Здесь можно передать параметры в WordsQuizModal, например, через колбек или глобальное состояние
    onStart({ length, wordCount });
  };

  return (
    <div className="modal">
      <h2>Настройки</h2>
      <label>
        Длина слова:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </label>
      <label>
        Количество слов:
        <input
          type="number"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Начать</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
}

// Модальное окно с словами
function WordsQuizModal({ theme, onClose }) {
  const [words, setWords] = useState([]); // массив слов
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(null); // правильно/неправильно

  // Тут можно подгрузить слова, например, из API или из переданных данных
  // Для примера: имитация загрузки
  React.useEffect(() => {
    // по теме и настройкам грузим слова
    fetch(`https://example.com/words?theme=${theme}`)
      .then(res => res.json())
      .then(data => {
        // выбрать случайные слова по длине, и количество
        setWords(shuffleArray(data).slice(0, 10));
      });
  }, [theme]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setShowResult(isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowResult(null);
    } else {
      alert('Тест завершен!'); // или другое завершение
    }
  };

  if (words.length === 0) return <p>Загрузка слов...</p>;

  return (
    <div className="modal">
      <h2>Слово: {words[currentIndex]}</h2>
      {showResult !== null && (
        <div>
          {showResult ? <p>Правильно!</p> : <p>Неправильно!</p>}
          <button onClick={handleNext}>Следующее</button>
        </div>
      )}
      {showResult === null && (
        <div>
          <button onClick={() => handleAnswer(true)}>Правильно</button>
          <button onClick={() => handleAnswer(false)}>Неправильно</button>
        </div>
      )}
      <p>
        Правильных: {score.correct} Неправильных: {score.incorrect}
      </p>
    </div>
  );
}

// Вспомогательная функция перемешивания массива
function shuffleArray(array) {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

Пример структуры папки «hooks»:

src/
  hooks/
    useFetch.js
    useDebounce.js
    useModalState.js
    ...
  components/
    MainPage.jsx
    ModalThemeAndSettings.jsx
    WordsQuizModal.jsx


    import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}


import { useFetch } from '../hooks/useFetch';

function SomeComponent() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка!</p>;

  return <div>{/* отображение данных */}</div>;
}


import React, { useState } from 'react';
import { useQuizScore } from '../hooks/useQuizScore';

function WordsQuizModal({ words, onClose }) {
  const { score, incrementCorrect, incrementIncorrect } = useQuizScore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(null); // true или false

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      incrementCorrect();
    } else {
      incrementIncorrect();
    }
    setShowResult(isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowResult(null);
    } else {
      alert(`Тест завершен! Правильных: ${score.correct}, Неправильных: ${score.incorrect}`);
      onClose(); // закрываем модал или переходим к результатам
    }
  };

  if (words.length === 0) return <p>Загрузка...</p>;

  return (
    <div className="modal">
      <h2>Слово: {words[currentIndex]}</h2>
      {showResult !== null && (
        <div>
          {showResult ? <p>Правильно!</p> : <p>Неправильно!</p>}
          <button onClick={handleNext}>Следующее</button>
        </div>
      )}
      {showResult === null && (
        <div>
          <button onClick={() => handleAnswer(true)}>Правильно</button>
          <button onClick={() => handleAnswer(false)}>Неправильно</button>
        </div>
      )}
      <p>
        Правильных: {score.correct} Неправильных: {score.incorrect}
      </p>
    </div>
  );
}


 Хук useWordsByLength
Этот хук будет хранить список слов определенной длины и предоставлять функцию для установки слова.

// src/hooks/useWordsByLength.js
import { useState } from 'react';

export function useWordsByLength() {
  const [words, setWords] = useState([]);

  const setWordsOfLength = (newWords) => {
    setWords(newWords);
  };

  return { words, setWordsOfLength };
}

Хук useShuffledWords
Этот хук обеспечивает выдачу случайных слов из набора и повторяет неправильно ответившие слова.

// src/hooks/useShuffledWords.js
import { useState, useRef } from 'react';

export function useShuffledWords(initialWords) {
  const [remainingWords, setRemainingWords] = useState(() => shuffleArray([...initialWords]));
  const wrongWordsRef = useRef([]);

  // функция для получения следующего слова
  const getNextWord = () => {
    if (remainingWords.length === 0 && wrongWordsRef.current.length === 0) {
      return null; // все слова закончились
    }

    if (remainingWords.length === 0 && wrongWordsRef.current.length > 0) {
      // повторяем неправильно ответившие слова
      setRemainingWords(wrongWordsRef.current);
      wrongWordsRef.current = [];
    }

    const index = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[index];

    // удаляем слово из текущего набора
    const newRemaining = [...remainingWords];
    newRemaining.splice(index, 1);
    setRemainingWords(newRemaining);

    return word;
  };

  // функция для отметки слова как неправильно
  const markWrong = (word) => {
    wrongWordsRef.current.push(word);
  };

  return { getNextWord, markWrong };
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

Пример — вывод слова, и в случае неправильного ответа вызывайте markWrong, а для получения следующего слова используйте getNextWord.

import React, { useState, useEffect } from 'react';
import { useWordsByLength } from '../hooks/useWordsByLength';
import { useShuffledWords } from '../hooks/useShuffledWords';

function WordsGame({ initialWordList }) {
  const { setWordsOfLength, words } = useWordsByLength();
  const { getNextWord, markWrong } = useShuffledWords(words);
  const [currentWord, setCurrentWord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Инициализация слов по длине
  useEffect(() => {
    // фильтруем слова по длине, например, 5 символов
    const filtered = initialWordList.filter(w => w.length === 5);
    setWordsOfLength(filtered);
    setLoading(false);
  }, [initialWordList]);

  useEffect(() => {
    if (words.length > 0) {
      const nextWord = getNextWord();
      setCurrentWord(nextWord);
    }
  }, [words]);

  const handleAnswer = (correct) => {
    if (!correct) {
      markWrong(currentWord);
    }
    const nextWord = getNextWord();
    if (nextWord) {
      setCurrentWord(nextWord);
    } else {
      alert('Все слова пройдены!');
    }
  };

  if (loading || !currentWord) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Слово: {currentWord}</h2>
      <button onClick={() => handleAnswer(true)}>Правильно</button>
      <button onClick={() => handleAnswer(false)}>Неправильно</button>
    </div>
  );
}

