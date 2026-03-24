import React, { useState, useRef, useCallback } from 'react';

type DragPosition = { x: number; y: number };

type DraggableProps = {
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  initialPosition?: DragPosition;
  onDragStart?: () => void;
  onDragMove?: (pos: DragPosition) => void;
  onDragEnd?: (pos: DragPosition) => void;
};

const Draggable: React.FC<DraggableProps> = ({
  children,
  disabled = false,
  style,
  className,
  initialPosition = { x: 0, y: 0 },
  onDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const dragStartPos = useRef<DragPosition | null>(null);
  const lastPos = useRef<DragPosition>(initialPosition);
  const [dragPos, setDragPos] = useState<DragPosition>(initialPosition);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      onDragStart?.();
    },
    [disabled, onDragStart]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !dragStartPos.current) return;

      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;

      const newPos = { x: lastPos.current.x + dx, y: lastPos.current.y + dy };
      setDragPos(newPos);
      onDragMove?.(newPos);
    },
    [dragging, onDragMove]
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      const finalPos = dragPos;
      lastPos.current = finalPos;
      dragStartPos.current = null;
      onDragEnd?.(finalPos);
    },
    [dragPos, dragging, onDragEnd]
  );

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      className={className}
      style={{
        touchAction: 'none', // важно для корректной работы pointer-событий на мобильных
        userSelect: 'none',
        cursor: !disabled ? (dragging ? 'grabbing' : 'grab') : 'default',
        transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
        transition: dragging ? 'none' : 'transform 0.3s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;