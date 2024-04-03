'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';

type scheduletype = { content: string; starttime: string; endtime: string };

const CalendarPage = () => {
  const [date, onChange] = useState(new Date());
  const [schedules, setSchedule] = useState<scheduletype[]>([]);
  //   const [showSchedule, setShowSchedule] = useState(false);
  console.log(date);

  let starttimeInput: HTMLInputElement;
  let endtimeInput: HTMLInputElement;
  let contentInput: HTMLInputElement;

  const dayList = ['2024-03-26', '2024-03-27'];

  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <>
          <div className='w-[20px] h-[20px] bg-slate-300 rounded-full'>*</div>
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
        formatDay={(locale, date) => moment(date).format('D')}
        tileContent={addContent}
        onChange={onChange}
        locale='ko'
        showNeighboringMonth={false}
        onClickDay={(date) => {
          Swal.fire({
            title: 'sample',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '일정 확인하기',
            denyButtonText: `일정 추가하기`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success');
            } else if (result.isDenied) {
              Swal.fire({
                title: moment(date).format('YYYY-MM-DD'),
                html: `    <label for="starttime">시작시간</label>
                        <input type="datetime-local" id="starttime" class="swal2-input" placeholder="Password">
                        <br/>
                        <label for="endtime">끝나는 시간</label>
                        <input type="datetime-local" id="endtime" class="swal2-input" placeholder="Password">
                              <input type="text" id="content" class="swal2-input" placeholder="content">
                            `,
                confirmButtonText: '일정 저장',
                showCancelButton: true,
                cancelButtonText: '취소',
                focusConfirm: false,
                didOpen: () => {
                  const popup = Swal.getPopup()!;
                  contentInput = popup.querySelector(
                    '#content'
                  ) as HTMLInputElement;
                  starttimeInput = popup.querySelector(
                    '#starttime'
                  ) as HTMLInputElement;
                  endtimeInput = popup.querySelector(
                    '#endtime'
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
                console.log('리설트 벨류', result.value);
                setSchedule((prev) => [...prev, result.value]);
                console.log('스케줄', schedules);
              });
            }
          });
        }}
      />
      <div>{moment(date).format('Y년-M월-D일')}</div>
      <div>
        {schedules?.map((schedule) => {
          return (
            <>
              {schedule ? (
                <>
                  <h1>
                    일정 날짜:{moment(schedule.starttime).format('MM-DD')}
                  </h1>
                  <div className='flex border-black border-2 w-[800px]'>
                    <div className='w-[4.17%] bg-white h-[20px]'>0</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>1</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>2</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>3</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>4</div>
                    <div className='w-[4.17%] bg-slate-600 h-[20px]'>5</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>6</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>7</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>8</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>9</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>10</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>11</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>12</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>13</div>
                    <div className='w-[4.17%] bg-white h-[20px]'>14</div>
                  </div>

                  <p>시작시간:{moment(schedule.starttime).format('HH:MM')}</p>

                  <p>끝나는 시간:{moment(schedule.endtime).format('HH:MM')}</p>
                  <br />
                  <p>{schedule.content}</p>
                </>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default CalendarPage;
