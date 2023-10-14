interface CalculateButtonProps {
  onClick: () => Promise<void>;
}

function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <div className="d-grid pt-2">
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async (e) => {
          e.preventDefault();
          await onClick();
        }}
      >
        Calculate
      </button>
    </div>
  );
}

export default CalculateButton;
