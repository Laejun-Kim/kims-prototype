"use client";
// import { TItems, TItemStatus } from "@/pages/todo";
// import { $ } from "@/utils";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

type TItemStatus = "todo" | "doing";

export type TItem = {
  id: string;
  status: TItemStatus;
  title: string;
};

export type TItems = {
  [key in TItemStatus]: TItem[];
};

export default function TodoLibraryExample({
  items,
  setItems,
}: {
  items: TItems;
  setItems: (items: TItems) => void;
}) {
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const scourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const _items = JSON.parse(JSON.stringify(items)) as typeof items;
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const dummyArr = [
    { id: "1", status: "todo", title: "김미희" },
    { id: "2", status: "todo", title: "김래준" },
    { id: "3", status: "todo", title: "김대영" },
    { id: "4", status: "todo", title: "김은채" },
  ];

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">react-beautiful-dnd</h1>
        <span>with react library</span>
      </div>

      <div className="mt-4 flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
            {dummyArr.map((key) => (
              <Droppable key={key} droppableId={key}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="text-xs font-semibold">
                      {/* {key.toLocaleUpperCase()} */}
                    </span>
                    {dummyArr.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h5 className="font-semibold">{item.title}</h5>
                            <span className="text-sm text-gray-500">
                              이거 인간적으로 너무 어렵다
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
