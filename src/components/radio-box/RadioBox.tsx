import "./RadioBox.scss";

interface RadioBoxProps {
  id: string;
  name: string;
  label: string;
  value: string;
  selectedValue: string;
  handleChange: () => void;
}

const RadioBox = (props: RadioBoxProps) => {
  const { id, name, label, value, selectedValue, handleChange } = props;

  return (
    <div className="radio-container">
      <label className="radio-label">
        <input
          type="radio"
          className="radio-input"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          checked={selectedValue === value}
        />
        <span className="radio-custom"></span>
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default RadioBox;
