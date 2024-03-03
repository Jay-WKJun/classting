import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { QuizModel, QuizModelPOJO, createQuizModel } from '@/models/QuizModel';

type QuizState = QuizModel[] | undefined;

const QuizContext = createContext<QuizState>(undefined);
const SetQuizContext = createContext<
  | {
      setQuizs: Dispatch<SetStateAction<QuizState>>;
      initQuizs: (quizPojos: QuizModelPOJO[]) => void;
    }
  | undefined
>(undefined);

export function QuizStateProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [quizs, setQuizs] = useState<QuizModel[]>();

  const initQuizs = useCallback((quizPojos: QuizModelPOJO[]) => {
    setQuizs(quizPojos.map((quiz) => createQuizModel(quiz)));
  }, []);

  return (
    <QuizContext.Provider value={quizs}>
      <SetQuizContext.Provider
        value={useMemo(() => ({ initQuizs, setQuizs }), [initQuizs])}
      >
        {children}
      </SetQuizContext.Provider>
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);
export const useSetQuizContext = () => useContext(SetQuizContext);
