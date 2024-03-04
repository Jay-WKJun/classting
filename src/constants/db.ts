export const DB_NAME = 'classtingDB';

export const QUIZ_STORE_NAME = 'quizs';

export const QUIZ_STORE_SCHEMA = {
  store: QUIZ_STORE_NAME,
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'quizs', keypath: 'quizs', options: { unique: false } },
    { name: 'spendTime', keypath: 'spendTime', options: { unique: false } },
    { name: 'createdAt', keypath: 'createdAt', options: { unique: true } },
  ],
};

export const DB_CONFIG = {
  name: DB_NAME,
  version: 3,
  objectStoresMeta: [QUIZ_STORE_SCHEMA],
};
