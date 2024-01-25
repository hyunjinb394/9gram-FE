import classes from './calendarbody.module.css';
import { useCalendarContext } from './Calendar';
import Album, { returnWithZero } from './Album';
import ButtonCommon from '@components/UI/ButtonCommon';
import CalendarCells from './CalendarCells';
import { useEffect } from 'react';
import useCachingApi from '@hooks/useCachingApi';
import useApi, { TriggerType } from '@hooks/useApi';

const cumulative_cal_DateArr = {
  existedDate: [1, 5, 9, 30, 29],
  totalCalData: [1200, 1100, 1500, 1000, 400],
};

//필요한 전역 정보 나의 목표칼로리 (유저 정보에 포함)
const DUMMYtargetCalories = 1200;

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const dayOfWeekArray = dayOfWeek.map((day, idx) => (
  <div className={classes['week-wrapper']} key={`day-${idx}`}>
    <p className={`${classes['day-arr']} r-big`}>{day}</p>
  </div>
));

export interface CalendarBodyResult {
  existedDate: number[] | any[];
  totalCalData: number[] | any[];
}

export type CumulativeCalDateArr = {
  data: { existedDate: number[] | any[]; totalCalData: number[] | any[] };
};

const CalendarBody = () => {
  const { thisYear, thisMonth, selectedIndex, setSelectedIndex, isAlbum } =
    useCalendarContext();
  const {
    trigger,
    result: data,
  }: {
    trigger: TriggerType;
    result: CumulativeCalDateArr;
  } = useApi({
    path: `/cumulative-record?month=${thisYear}-${returnWithZero(thisMonth)}-01`,
  });
  // const { trigger, data } = useCachingApi({
  //   path: `/cumulative-record?month=${thisYear}-${returnWithZero(thisMonth)}-01`,
  // });

  useEffect(() => {
    trigger({});
  }, []);

  const getThisMonthArray = () => {
    const thisMonthTotal = new Date(thisYear, thisMonth, 0).getDate();
    const thisMonthFirstDay = new Date(thisYear, thisMonth - 1, 1).getDay();
    const totalCalNum = thisMonthTotal + thisMonthFirstDay > 35 ? 42 : 35;

    return new Array(totalCalNum).fill(0).map((_, idx) => {
      return (
        <CalendarCells
          key={`calcell-${idx}`}
          idx={idx}
          thisMonthFirstDay={thisMonthFirstDay}
          thisMonthTotal={thisMonthTotal}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          targetCalories={DUMMYtargetCalories}
          cumulative_cal_DateArr={data.data}
        />
      );
    });
  };

  return (
    <>
      {!isAlbum && (
        <>
          <div className={classes['cla-body']}>
            <div className={classes['cla-week']}>{dayOfWeekArray}</div>
            <div className={classes['cla-week']}>
              <div className={classes['cal-flex']}>{getThisMonthArray()}</div>
            </div>
          </div>
          <ButtonCommon
            style={{ margin: '20px auto' }}
            variant='default-active'
            size='big'
            disabled={!selectedIndex}
            href={`/record/${thisYear}-${returnWithZero(thisMonth)}-${returnWithZero(selectedIndex)}`}
          >
            {cumulative_cal_DateArr['existedDate'].includes(selectedIndex)
              ? '기록 보러 가기'
              : '기록 추가하러 가기'}
          </ButtonCommon>
        </>
      )}
      {isAlbum && <Album />}
    </>
  );
};

export default CalendarBody;
