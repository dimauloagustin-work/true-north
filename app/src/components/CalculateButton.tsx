interface CalculateButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
}

function CalculateButton({ onClick, disabled }: CalculateButtonProps) {
  return (
    <div className="d-grid pt-2">
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async (e) => {
          e.preventDefault();
          await onClick();
        }}
        disabled={disabled}
      >
        Calculate
      </button>
    </div>
  );
}

export default CalculateButton;
