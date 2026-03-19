import { IWord } from '../api/types'; // Импорт типа слова (IWord)
import { AppAction } from '../context/GameContext'; // Импорт типа действий редьюсера (AppAction)
import { ICategory } from '../api/types'; // Импорт типа категории (ICategory)

export function handleCategorySelect(
  category: string,              // Название выбранной категории (строка)
  categories: ICategory[],       // Массив всех доступных категорий, типизированный (ICategory[])
  dispatch: React.Dispatch<AppAction> // Функция dispatch для отправки действий в редьюсер
) {
  console.log('Выбор категории:', category);
  // Логируем выбранную категорию

  dispatch({ type: 'SET_CATEGORY', payload: category });
  // Отправляем действие, чтобы сохранить выбранную категорию в состоянии
  // payload: название категории (string)

  const selectedCategory = categories.find(c => c.category === category);
  // Ищем объект категории из массива по названию

  if (selectedCategory && selectedCategory.topics.length > 0) {
    // Если категория найдена, и в ней есть темы, то:

    const firstTopic = selectedCategory.topics[0].topic;
    // Берём название первой темы из выбранной категории

    dispatch({ type: 'SET_TOPIC', payload: firstTopic });
    // Отправляем действие для сохранения активной темы в состоянии
    // payload: имя первой темы (string)

    const allWordsWithTopic: IWord[] = selectedCategory.topics.flatMap(t =>
      t.words.map(w => ({ ...w, topic: t.topic }))
    );
    // Создаём массив всех слов из всех тем выбранной категории
    // Каждый объект слова дополняем полем topic с именем темы

    console.log('Все слова из категории по обеим темам:', allWordsWithTopic);
    // Логируем собранный список всех слов с темами

    dispatch({ type: 'SET_CATEGORY_WORDS', payload: allWordsWithTopic });
    // Отправляем действие для сохранения всех слов выбранной категории
    // payload: массив слов с дополнительным полем topic (IWord[])

    console.log('Слова из категории загружены в стейт:', allWordsWithTopic);
    // Логируем подтверждение, что слова загружены в состояние
  } else {
    dispatch({ type: 'SET_CATEGORY_WORDS', payload: [] });
    // Если категория не найдена или тем нет, сбрасываем список слов в состоянии
    // payload: пустой массив
  }
}