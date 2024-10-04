interface SubmitButtonProps {
  canSubmit: boolean;
  onButtonClick: () => void;
}

export default function SubmitButton({ canSubmit, onButtonClick }: SubmitButtonProps) {
  if (canSubmit)
    return (
      <button onClick={onButtonClick} className='text-sm font-medium py-2 px-3 text-center rounded-lg border focus:outline-none focus:ring-2'>
        Submit
      </button>
    );
  else return <></>;
}
