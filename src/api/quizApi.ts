import './Api';

import axios, { AxiosResponse } from 'axios';

import type { QuizModelPOJO, Difficulty } from '@/models/QuizModel';

interface GetQuizProps {
  amount?: number;
  difficulty?: Difficulty;
}

interface GetQuizResponse {
  responseCode: number;
  results: QuizModelPOJO[];
}

export async function getQuizs({
  amount = 3,
  difficulty = 'easy',
}: GetQuizProps) {
  const params = {
    amount,
    difficulty,
    type: 'multiple',
  };
  return axios
    .get('https://opentdb.com/api.php', {
      params,
    })
    .then((res: AxiosResponse<GetQuizResponse>) => res.data);
}
