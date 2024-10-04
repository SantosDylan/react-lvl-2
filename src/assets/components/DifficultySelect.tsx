// interface CategorySelectProps {

import { Difficulty } from '../../interfaces/difficulties.interface';

interface DifficultyProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelect({ selectedDifficulty, onDifficultyChange }: DifficultyProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  return (
    <>
      <select name='difficulty-select' id='difficultySelect' value={selectedDifficulty} onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}>
        {difficulties.map((difficulty, id) => (
          <option key={id}>{difficulty}</option>
        ))}
      </select>
    </>
  );
}
