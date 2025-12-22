// Checkbox.types.ts
export interface CheckboxProps {
  label: string;                // подпись к чекбоксу
  checked: boolean;             // состояние галочки
  onChange: (checked: boolean) => void; // обработчик изменения состояния
  disabled?: boolean;           // отключить чекбокс
  id?: string;                  // id для связки label и input
  className?: string;           // дополнительные классы
}