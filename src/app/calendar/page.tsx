"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Swal from "sweetalert2";

// type ScheduleForm = {
//   timestamp: string;
//   content: string;
// };
type scheduletype = { content: string; starttime: string; endtime: string };

const CalendarPage = () => {
  const [date, onChange] = useState(new Date());
  const [schedules, setSchedule] = useState<scheduletype[]>([]);
  console.log(date);

  let starttimeInput: HTMLInputElement;
  let endtimeInput: HTMLInputElement;
  let contentInput: HTMLInputElement;

  const dayList = ["2024-03-26", "2024-03-27"];

  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contents.push(
        <>
          <div className="w-[20px] h-[20px] bg-slate-300 rounded-full">*</div>
        </>
      );
    }
    console.log(contents);
    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };
  return (
    <>
      <div>캘린더를 화면에 뿌려보자</div>
      <Calendar
        value={date}
        formatDay={(locale, date) => moment(date).format("D")}
        tileContent={addContent}
        onChange={onChange}
        locale="ko"
        showNeighboringMonth={false}
        onClickDay={(date) => {
          Swal.fire({
            title: moment(date).format("YYYY-MM-DD"),
            html: `
            <input type="time" id="starttime" class="swal2-input" placeholder="Password">
            <input type="time" id="endtime" class="swal2-input" placeholder="Password">
                  <input type="text" id="content" class="swal2-input" placeholder="content">
                `,
            confirmButtonText: "일정 저장",
            showCancelButton: true,
            cancelButtonText: "취소",
            focusConfirm: false,
            didOpen: () => {
              const popup = Swal.getPopup()!;
              contentInput = popup.querySelector(
                "#content"
              ) as HTMLInputElement;
              starttimeInput = popup.querySelector(
                "#starttime"
              ) as HTMLInputElement;
              endtimeInput = popup.querySelector(
                "#endtime"
              ) as HTMLInputElement;

              //   contentInput.onkeyup = (event) =>
              //     event.key === "Enter" && Swal.clickConfirm();
              //   timeInput.onkeyup = (event) =>
              //     event.key === "Enter" && Swal.clickConfirm();
            },
            preConfirm: () => {
              const content = contentInput.value;
              const starttime = starttimeInput.value;
              const endtime = endtimeInput.value;

              return { content, starttime, endtime };
            },
          }).then((result) => {
            console.log("리설트 벨류", result.value);
            setSchedule((prev) => [...prev, result.value]);
            console.log("스케줄", schedules);
          });
        }}
      />
      <div>{moment(date).format("Y년-M월-D일")}</div>
      <div>
        {schedules?.map((schedule) => {
          return (
            <>
              <p>시작시간:{schedule.starttime}</p>
              <br />
              <p>끝나는 시간:{schedule.endtime}</p>
              <br />
              <p>{schedule.content}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CalendarPage;
