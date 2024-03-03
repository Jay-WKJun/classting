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

type QuizState = QuizModel[];

const QuizsContext = createContext<QuizState>([]);
const QuizsSettersContext = createContext<
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
  const [quizs, setQuizs] = useState<QuizModel[]>([]);

  const initQuizs = useCallback((quizPojos: QuizModelPOJO[]) => {
    setQuizs(quizPojos.map((quiz) => createQuizModel(quiz)));
  }, []);

  return (
    <QuizsContext.Provider value={quizs}>
      <QuizsSettersContext.Provider
        value={useMemo(() => ({ initQuizs, setQuizs }), [initQuizs])}
      >
        {children}
      </QuizsSettersContext.Provider>
    </QuizsContext.Provider>
  );
}

export const useQuizsContext = () => useContext(QuizsContext);
export const useQuizsSettersContext = () => useContext(QuizsSettersContext);
