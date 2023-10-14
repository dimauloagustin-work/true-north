interface CalculatorButtonProps {
  active: string;
  icon: string;
  onClick: (icon: string) => void;
}

function CalculatorButton({ active, icon, onClick }: CalculatorButtonProps) {
  return (
    <div style={{ padding: "3px" }}>
      <button
        style={{ width: "100%", height: "100%", fontSize: "2em" }}
        className={
          "btn " + (active === icon ? "btn-primary" : "btn-outline-primary")
        }
        onClick={(e) => {
          e.preventDefault();
          onClick(icon);
        }}
      >
        {icon}
      </button>
    </div>
  );
}

export default CalculatorButton;
