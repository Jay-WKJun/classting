import type { SelectionModel } from '@/models/SelectionModel';

import { SelectionState } from '../Selection';

export function getSelectionState(selection: SelectionModel): SelectionState {
  if (selection.isSelected) {
    return 'selected';
  }

  if (selection.isCorrect) {
    return 'answer';
  }

  return null;
}
