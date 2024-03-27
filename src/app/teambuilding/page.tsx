"use client";

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

export default function TodoLibraryExample() {
  const dummyArr = [
    { id: "01", team: "1", title: "김미희" },
    { id: "02", team: "1", title: "김래준" },
    { id: "03", team: "1", title: "김대영" },
    { id: "04", team: "2", title: "김은채" },
  ];

  const [people, setPeople] = useState(dummyArr);

  const handleDragDrop = (results: DropResult) => {
    console.log("드래그앤드롭이 발생함!!", results);
    //result 의 source 와 destination 에 출발지점과 도착지점이 기록된다
    const { source, destination, type } = results;
    if (!destination) return; //엉뚱한 곳에 내려놓으면 아무것도 안하겠단 거임
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    //집어 올렸다가 같은 곳에 내려놔도 아무것도 안하겠단 거고
    if (type === "group") {
      const reorderedPeople = [...people];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedPerson] = reorderedPeople.splice(sourceIndex, 1);
      reorderedPeople.splice(destinationIndex, 0, removedPerson);

      return setPeople(reorderedPeople);
    }
    const teamSourceIndex = people.findIndex(
      (person) => person.id === source.droppableId
    );
    const teamDestinationIndex = people.findIndex(
      (person) => person.id === destination.droppableId
    );
    const newSourceItems = [...people[teamSourceIndex].items];
  };

  // --- requestAnimationFrame 초기화
  // const [enabled, setEnabled] = useState(false);

  // useEffect(() => {
  //   const animation = requestAnimationFrame(() => setEnabled(true));

  //   return () => {
  //     cancelAnimationFrame(animation);
  //     setEnabled(false);
  //   };
  // }, []);

  // if (!enabled) {
  //   return null;
  // }
  // --- requestAnimationFrame 초기화 END

  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">팀 빌딩 페이지 프로토타입</h1>
        <span>이게 되긴 되는건가....</span>
      </div>

      <div className="mt-4 flex">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
            <Droppable droppableId="1" type="group">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-500"
                  >
                    <p>1조</p>
                    {people.map((person, idx) => (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {person.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {/* 이게 있어야 droppable 크기가 고정된다 */}
                  </div>
                );
              }}
            </Droppable>
            <Droppable droppableId="2" type="group">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-500"
                  >
                    <p>2조</p>
                  </div>
                );
              }}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
