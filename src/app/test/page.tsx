"use client";
import React from "react";

const page = () => {
  let startPercentage = 0;
  let endPercentage = 0;
  const starthour = 10;
  const startminute = 20;
  const endhour = 15;
  const endminute = 45;
  function calculatePercentageInDay(
    starthour,
    startminute,
    endhour,
    endminute
  ) {
    // 입력된 시간을 분 단위로 변환
    const totalStartMinutes = starthour * 60 + startminute;
    const totalEndMinutes = endhour * 60 + endminute;

    // 하루의 총 분 수
    const totalMinutesInDay = 24 * 60;

    // 시간을 백분율로 계산
    startPercentage = (totalStartMinutes / totalMinutesInDay) * 100;
    endPercentage = (totalEndMinutes / totalMinutesInDay) * 100;

    return [Math.round(startPercentage / 2), Math.round(endPercentage / 2)];
  }

  const startDivNumber = startPercentage / 2;
  const endDivNumber = endPercentage / 2;

  const totalArray = Array.from({ length: 48 }, (_, index) => index + 1);

  // 예시 시간: 15시 28분
  const hour = 15;
  const minute = 28;

  // 함수 호출하여 백분율 계산
  const percentage = calculatePercentageInDay(3, 20, 15, 45);
  console.log(percentage);
  const [start, end] = percentage;
  //   console.log(
  //     `입력된 시간은 하루 중 약 ${percentage.toFixed(2)}% 에 해당합니다.`
  //   );
  function createIntegerArray(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }
  console.log(createIntegerArray(start, end));
  const coloredDiv = createIntegerArray(start, end);

  return (
    <section className="flex w-[800px] h-[30px] ">
      {totalArray.map((item) => {
        return coloredDiv.includes(item) ? (
          <div
            className={`${item + ""} w-full p-1 text-xs bg-blue-400`}
            key={item}
          >
            {item}
          </div>
        ) : (
          <div
            className={`${item + ""} w-full p-1 text-xs bg-slate-400`}
            key={item}
          >
            {item}
          </div>
        );
      })}
    </section>
  );
};

export default page;
