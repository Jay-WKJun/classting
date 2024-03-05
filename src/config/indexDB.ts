import Dexie, { Table } from 'dexie';

import { DB_NAME, QUIZ_STORE_NAME } from '@/constants/db';
import { QuizModel } from '@/models/QuizModel';

export type QuizHistory = {
  id?: number;
  spendTime: number;
  createdAt: number;
  quizs: QuizModel[];
};

export class ClasstingDB extends Dexie {
  [QUIZ_STORE_NAME]!: Table<QuizHistory>;

  constructor() {
    super(DB_NAME);
    this.version(3).stores({
      [QUIZ_STORE_NAME]: '++id, quizs, spendTime, createdAt', // Primary key and indexed props
    });
  }
}

export const db = new ClasstingDB();
