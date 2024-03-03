import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type TimeState = number;

const TimeContext = createContext<TimeState | undefined>(undefined);
const SetTimeContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);

export function TimeStateProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [startTime, setStartTime] = useState<number>(0);

  return (
    <TimeContext.Provider value={startTime}>
      <SetTimeContext.Provider value={setStartTime}>
        {children}
      </SetTimeContext.Provider>
    </TimeContext.Provider>
  );
}

export const useTimeContext = () => useContext(TimeContext);
export const useSetTimeContext = () => useContext(SetTimeContext);
