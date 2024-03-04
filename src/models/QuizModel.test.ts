import {
  QuizModelPOJO,
  createQuizModel,
  QuizModel,
  selectQuiz,
} from './QuizModel';

describe('createQuizModel function', () => {
  const quizPOJO: QuizModelPOJO = {
    category: 'Science',
    type: true,
    difficulty: 'medium',
    question: '&lt;p&gt;What is the chemical symbol for water?&lt;/p&gt;',
    correctAnswer: 'H2O',
    incorrectAnswers: ['CO2', 'NaCl', 'O2'],
  };

  test('creates a QuizModel object with correct properties', () => {
    const quizModel = createQuizModel(quizPOJO);

    expect(quizModel).toHaveProperty('category', 'Science');
    expect(quizModel).toHaveProperty('type', true);
    expect(quizModel).toHaveProperty('difficulty', 'medium');
    expect(quizModel).toHaveProperty(
      'question',
      '<p>What is the chemical symbol for water?</p>',
    );
    expect(quizModel).toHaveProperty('correctAnswer', 'H2O');
    expect(quizModel).toHaveProperty('incorrectAnswers', ['CO2', 'NaCl', 'O2']);
    expect(quizModel).toHaveProperty('correctAnswerIndex', expect.any(Number));
    expect(quizModel).toHaveProperty('selectedIndex', null);
    expect(quizModel).toHaveProperty('selections');
  });

  test('correctAnswerIndex is within the range of selections', () => {
    const quizModel = createQuizModel(quizPOJO);
    const { selections, correctAnswerIndex } = quizModel;

    expect(correctAnswerIndex).toBeGreaterThanOrEqual(0);
    expect(correctAnswerIndex).toBeLessThan(selections.length);
  });

  test('decoded HTML entities in the question property', () => {
    const quizModel = createQuizModel(quizPOJO);
    const { question } = quizModel;

    expect(question).toBe('<p>What is the chemical symbol for water?</p>');
  });

  test('selections include correct answer and shuffled incorrect answers', () => {
    const quizModel = createQuizModel(quizPOJO);
    const { selections, correctAnswerIndex, correctAnswer } = quizModel;

    expect(selections.length).toBe(4); // 3 incorrect + 1 correct
    expect(selections[correctAnswerIndex].content).toBe(correctAnswer);
    expect(
      selections.filter((sel) => sel.content === correctAnswer),
    ).toHaveLength(1); // Only one correct answer
  });

  const quizPOJOMoreSelection: QuizModelPOJO = {
    category: 'Science',
    type: true,
    difficulty: 'medium',
    question: '&lt;p&gt;What is the chemical symbol for water?&lt;/p&gt;',
    correctAnswer: 'Correct',
    incorrectAnswers: ['a', 'b', 'c', 'd', 'e', 'f'],
  };

  test('selections include correct answer and shuffled incorrect answers', () => {
    const quizModel = createQuizModel(quizPOJOMoreSelection);
    const { selections, correctAnswerIndex, correctAnswer } = quizModel;

    expect(selections.length).toBe(7);
    expect(selections[correctAnswerIndex].content).toBe(correctAnswer);
    expect(
      selections.filter((sel) => sel.content === correctAnswer),
    ).toHaveLength(1); // Only one correct answer
  });
});

describe('selectQuiz function', () => {
  const quiz: QuizModel = {
    category: 'Science',
    type: true,
    difficulty: 'medium',
    question: 'What is the chemical symbol for water?',
    correctAnswer: 'H2O',
    incorrectAnswers: ['CO2', 'NaCl', 'O2'],
    selections: [
      { content: 'CO2', index: 0, isCorrect: false, isSelected: false },
      { content: 'NaCl', index: 1, isCorrect: false, isSelected: false },
      { content: 'O2', index: 2, isCorrect: false, isSelected: false },
      { content: 'H2O', index: 3, isCorrect: true, isSelected: false },
    ],
    correctAnswerIndex: 3,
    selectedIndex: null,
  };

  test('selects the correct selection and updates isSelected property', () => {
    const updatedQuiz = selectQuiz(quiz, 1);

    expect(updatedQuiz.selectedIndex).toBe(1);
    expect(updatedQuiz.selections[1].isSelected).toBe(true);

    expect(updatedQuiz.selections[0].isSelected).toBe(false);
    expect(updatedQuiz.selections[2].isSelected).toBe(false);
    expect(updatedQuiz.selections[3].isSelected).toBe(false);
  });

  test('should make new quiz object', () => {
    const originalSelections = [...quiz.selections];
    selectQuiz(quiz, 2);

    expect(quiz.selections).toEqual(originalSelections);
  });

  test('returns the same quiz object if the same index is selected again', () => {
    const updatedQuiz = selectQuiz(quiz, 3);
    const sameIndexSelectedQuiz = selectQuiz(updatedQuiz, 3);

    expect(sameIndexSelectedQuiz).toEqual(updatedQuiz);
  });
});
