export interface SelectionModelInput {
  content: string;
  index: number;
  isCorrect: boolean;
}

class SelectionModel {
  content: string;

  isSelected = false;

  index: number;

  isCorrect: boolean;

  constructor({
    content,
    index,
    isCorrect,
  }: SelectionModelInput) {
    this.content = content;
    this.index = index;
    this.isCorrect = isCorrect;
  }

  selectThis = () => {
    this.isSelected = true;
  };

  getThisSelectionState = () => {
    if (!this.isSelected) {
      return 'not selected';
    }

    if (this.isCorrect) {
      return 'correct';
    }

    return 'inCorrect';
  };

  initSelect = () => {
    this.isSelected = false;
  };
}

export { SelectionModel };
