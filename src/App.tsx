// src/App.tsx
import React, { useContext, useState, useEffect } from "react";
import GameContext, {
  ICategory,
  ITopic,
  IWordItem,
} from './context/GameContext';

/* ------------------- небольшие «заглушки» данных ------------------- */
// В реальном проекте эти данные, скорее всего, приходят из API/файла.
const CATEGORIES: ICategory[] = [
  {
    category: "Животные",
    topics: [
      { topic: "Млекопитающие", words: [{ word: "слон" }, { word: "кошка" }] },
      { topic: "Птицы", words: [{ word: "воробей" }, { word: "сова" }] },
    ],
  },
  {
    category: "Техника",
    topics: [
      { topic: "Компьютеры", words: [{ word: "монитор" }, { word: "клавиатура" }] },
      { topic: "Автомобили", words: [{ word: "седан" }, { word: "внедорожник" }] },
    ],
  },
];

/* ------------------- вспомогательные функции ------------------- */
// Возвращает случайный элемент массива
const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Формирует слово и две темы‑варианта для текущего раунда
function prepareRound(
  category: ICategory,
  topics: [string, string],
  length: "short" | "medium" | "long"
) {
  // ищем темы по названиям
  const topicObjs = topics.map(
    (t) => category.topics.find((tp) => tp.topic === t) as ITopic
  );

  // берём случайное слово из первой темы, проверяем длину
  const candidates = topicObjs[0].words.filter((w) => {
    const len = w.word.length;
    if (length === "short") return len <= 4;
    if (length === "medium") return len >= 5 && len <= 7;
    return len >= 8;
  });

  const word = getRandom(candidates).word;

  // варианты тем – просто названия тем, их порядок перемешаем
  const options = [...topics];
  // перемешаем массив «in‑place»
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { word, options };
}

/* ------------------- простой компонент модального окна ------------------- */
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button style={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

/* ------------------- основной компонент App ------------------- */
const App: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  // Управление показом модальных окон
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isTestModalOpen, setTestModalOpen] = useState(false);

  // Состояния локального UI
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [topicA, setTopicA] = useState<string>("");
  const [topicB, setTopicB] = useState<string>("");

  // Цвет подсветки выбранного ответа в тесте
  const [selectedOption, setSelectedOption] = useState<null | "A" | "B">(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /** --------------------------------------------------------------
   *  1️⃣ Главная страница – выбор длины слова
   * -------------------------------------------------------------- */
  const handleLengthSelect = (len: "short" | "medium" | "long") => {
    dispatch({ type: "SET_LENGTH", payload: len });
  };

  /** --------------------------------------------------------------
   *  2️⃣ Открытие модального окна выбора категории/тем
   * -------------------------------------------------------------- */
  const startGame = () => {
    if (!state.selectedLength) {
      alert("Сначала выберите длину слова");
      return;
    }
    setCategoryModalOpen(true);
  };

  /** --------------------------------------------------------------
   *  3️⃣ Подтверждение выбора категории и тем
   * -------------------------------------------------------------- */
  const confirmCategoryAndTopics = () => {
    if (!selectedCategory) {
      alert("Выберите категорию");
      return;
    }
    if (!topicA || !topicB) {
      alert("Выберите обе темы");
      return;
    }
    if (topicA === topicB) {
      alert("Темы должны быть различны");
      return;
    }

    // Сохраняем в глобальном стейте
    dispatch({ type: "SET_CATEGORY", payload: selectedCategory });
    dispatch({ type: "SET_TOPICS", payload: [topicA, topicB] });

    // Подготовка первого раунда
    const { word, options } = prepareRound(
      selectedCategory,
      [topicA, topicB],
      state.selectedLength!
    );
    dispatch({ type: "SET_CURRENT_WORD", payload: word });
    dispatch({ type: "SET_OPTIONS", payload: options });

    // Переходим к тесту
    setCategoryModalOpen(false);
    setTestModalOpen(true);
  };

  /** --------------------------------------------------------------
   *  4️⃣ Обработка ответа в тестовом модальном окне
   * -------------------------------------------------------------- */
  const handleAnswer = (chosenOption: "A" | "B") => {
    const chosenTopic = state.currentOptions[chosenOption === "A" ? 0 : 1];
    const correctTopic = state.selectedTopics![0]; // первая тема – «правильная»

    const answerIsCorrect = chosenTopic === correctTopic;

    // Запоминаем результат (чтобы подсветить кнопку)
    setSelectedOption(chosenOption);
    setIsCorrect(answerIsCorrect);
    dispatch({ type: "ANSWER", payload: answerIsCorrect });

    // Через 1.2 сек. подготавливаем следующее слово
    setTimeout(() => {
      const { word, options } = prepareRound(
        state.selectedCategory!,
        state.selectedTopics!,
        state.selectedLength!
      );
      dispatch({ type: "SET_CURRENT_WORD", payload: word });
      dispatch({ type: "SET_OPTIONS", payload: options });

      // Сбрасываем подсветку
      setSelectedOption(null);
      setIsCorrect(null);
    }, 1200);
  };

  /** --------------------------------------------------------------
   *  5️⃣ Сброс игры (сохраняет выбранную длину)
   * -------------------------------------------------------------- */
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    setCategoryModalOpen(false);
    setTestModalOpen(false);
    setSelectedCategory(null);
    setTopicA("");
    setTopicB("");
    setSelectedOption(null);
    setIsCorrect(null);
  };

  /* -----------------------------------------------------------------
   *  JSX‑разметка
   * ----------------------------------------------------------------- */
  return (
    <div style={styles.appContainer}>
      {/* ---------- 1️⃣ Главная страница ---------- */}
      <h1>🧠 Игра «Определи тему слова»</h1>

      <section style={styles.section}>
        <h2>Шаг 1. Выберите длину слова</h2>
        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.btn,
              backgroundColor:
                state.selectedLength === "short" ? "#4caf50" : "#e0e0e0",
            }}
            onClick={() => handleLengthSelect("short")}
          >
            Короткое (≤ 4)
          </button>
          <button
            style={{
              ...styles.btn,
              backgroundColor:
                state.selectedLength === "medium" ? "#4caf50" : "#e0e0e0",
            }}
            onClick={() => handleLengthSelect("medium")}
          >
            Среднее (5‑7)
          </button>
          <button
            style={{
              ...styles.btn,
              backgroundColor:
                state.selectedLength === "long" ? "#4caf50" : "#e0e0e0",
            }}
            onClick={() => handleLengthSelect("long")}
          >
            Длинное (≥ 8)
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2>Шаг 2. Начать игру</h2>
        <button style={styles.startBtn} onClick={startGame}>
          ▶️ Старт
        </button>
      </section>

      {/* ---------- Статистика ---------- */}
      <section style={styles.section}>
        <h2>Статистика</h2>
        <p>Правильных ответов: {state.correctAnswers}</p>
        <p>Неправильных ответов: {state.wrongAnswers}</p>
        <button style={styles.resetBtn} onClick={resetGame}>
          🔄 Сбросить игру
        </button>
      </section>

      {/* ---------- 2️⃣ Модальное окно выбора категории/тем ---------- */}
      <Modal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)}>
        <h2>Выберите категорию и две темы</h2>

        {/* Выбор категории */}
        <label>
          Категория:
          <select
            value={selectedCategory?.category || ""}
            onChange={(e) => {
              const cat = CATEGORIES.find((c) => c.category === e.target.value);
              setSelectedCategory(cat || null);
              // при смене категории сбрасываем выбранные темы
              setTopicA("");
              setTopicB("");
            }}
            style={styles.select}
          >
            <option value="" disabled>
              — выберите —
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
        </label>

        {/* Выбор первой темы */}
        <label>
          Тема 1:
          <select
            value={topicA}
            onChange={(e) => setTopicA(e.target.value)}
            disabled={!selectedCategory}
            style={styles.select}
          >
            <option value="" disabled>
              — выберите —
            </option>
            {selectedCategory?.topics.map((t) => (
              <option key={t.topic} value={t.topic}>
                {t.topic}
              </option>
            ))}
          </select>
        </label>

        {/* Выбор второй темы */}
        <label>
          Тема 2:
          <select
            value={topicB}
            onChange={(e) => setTopicB(e.target.value)}
            disabled={!selectedCategory}
            style={styles.select}
          >
            <option value="" disabled>
              — выберите —
            </option>
            {selectedCategory?.topics.map((t) => (
              <option key={t.topic} value={t.topic}>
                {t.topic}
              </option>
            ))}
          </select>
        </label>

        <button style={styles.confirmBtn} onClick={confirmCategoryAndTopics}>
          ✅ Подтвердить
        </button>
      </Modal>

      {/* ---------- 3️⃣ Модальное окно теста ---------- */}
      <Modal isOpen={isTestModalOpen} onClose={() => setTestModalOpen(false)}>
        <h2>Определите тему слова</h2>

        {/* Текущее слово */}
        <div style={styles.wordBox}>
          <strong>{state.currentWord}</strong>
        </div>

        {/* Кнопки‑варианты */}
        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.btn,
              backgroundColor:
                selectedOption === "A"
                  ? isCorrect
                    ? "#4caf50"
                    : "#f44336"
                  : "#e0e0e0",
            }}
            onClick={() => handleAnswer("A")}
            disabled={selectedOption !== null}
          >
            {state.currentOptions[0]}
          </button>

          <button
            style={{
              ...styles.btn,
              backgroundColor:
                selectedOption === "B"
                  ? isCorrect
                    ? "#4caf50"
                    : "#f44336"
                  : "#e0e0e0",
            }}
            onClick={() => handleAnswer("B")}
            disabled={selectedOption !== null}
          >
            {state.currentOptions[1]}
          </button>
        </div>

        {/* Инфо‑блок */}
        <p>
          Правильных: {state.correctAnswers} | Неправильных: {state.wrongAnswers}
        </p>
      </Modal>
    </div>
  );
};

/* ------------------- стили (inline, просто для примера) ------------------- */
const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  btn: {
    padding: "10px 20px",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    minWidth: 120,
  },
  startBtn: {
    padding: "12px 30px",
    fontSize: 16,
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  resetBtn: {
    padding: "8px 16px",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginTop: 10,
  },
  select: {
    width: "100%",
    padding: 8,
    marginTop: 5,
    marginBottom: 15,
  },
  confirmBtn: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    maxWidth: 400,
    position: "relative",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
  },
  wordBox: {
    fontSize: 24,
    marginBottom: 20,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 4,
    backgroundColor: "#fafafa",
  },
};

export default App;