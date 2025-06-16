import "./CheckBox.scss";

interface CheckBoxInterface {
  id: string;
  name: string;
  label: string;
  value: boolean;
  toggleCheckBox: (value: boolean) => void;
}

const CheckBox = (props: CheckBoxInterface) => {
  const { id, name, label, value, toggleCheckBox } = props;

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-input"
          id={id}
          name={name}
          onClick={() => toggleCheckBox(!value)}
        />
        <span className="checkbox-custom"></span>
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default CheckBox;
