import "./InputBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faFileImage, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export enum InputTypes {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Date = "date",
  Checkbox = "checkbox",
  Radio = "radio",
  File = "file",
  Submit = "submit",
  DropDown = "DropDown",
}

interface DropdownOptions {
  id: string;
  title: string;
}

interface InputBoxProps {
  id: string;
  name: string;
  type: InputTypes;
  value: string;
  label: string;
  isRequired?: boolean;
  showUnitIcon?: boolean;
  unit?: string;
  iconName?: IconDefinition;
  isDisabled?: boolean;
  isHiddenInput?: boolean;
  options?: DropdownOptions[];
  setInputValue: (value: string) => void;
  handleShowHideInput?: () => void;
  handleSelectedFile?: (e: File) => void;
}

const InputBox = (props: InputBoxProps) => {
  const {
    id,
    name,
    type,
    value,
    label,
    isRequired,
    isHiddenInput,
    options,
    showUnitIcon,
    iconName,
    unit,
    isDisabled,
    setInputValue,
    handleShowHideInput,
    handleSelectedFile,
  } = props;

  if (type === InputTypes.DropDown) {
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
      setInputValue(selectedValue);
    }, [selectedValue]);

    return (
      <div
        className={`input-container dropdown-input ${
          isDisabled ? "disabled" : ""
        }`}
      >
        <select
          className="input-field dropdown-select"
          id="customDropdown"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="" hidden></option>
          {options?.length &&
            options.map((data) => (
              <option value={data.id} key={data.id}>
                {data.title}
              </option>
            ))}
        </select>
        <label
          htmlFor="customDropdown"
          className={`dropdown-label ${
            !selectedValue ? "dropdown-label-selected" : ""
          }`}
        >
          {label}
        </label>
      </div>
    );
  }

  if (type === InputTypes.File) {
    const displayFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        if (handleSelectedFile) {
          handleSelectedFile(file);
        }
      }
    };

    return (
      <div className={`input-container ${isDisabled ? "disabled" : ""}`}>
        <label htmlFor={id} className="file-label">
          <div>{label}</div>
          <FontAwesomeIcon icon={faFileImage} className="file-icon" />
        </label>
        <input
          id={id}
          type={type}
          className="file-input"
          accept="image/*"
          onChange={displayFile}
        />
      </div>
    );
  }

  return (
    <div className={`input-container ${isDisabled ? "disabled" : ""}`}>
      <div className="mat-input-wrapper">
        <input
          id={id}
          name={name}
          type={type}
          className="input-field"
          placeholder=""
          value={value}
          onChange={(e) => setInputValue(e.target.value)}
          required={isRequired}
          autoComplete={type === InputTypes.Password ? "new-password" : "off"}
        />
        <label htmlFor={id} className="input-label">
          {label}
        </label>

        <span className="mat-input-unit">
          {isHiddenInput && (
            <div className="show-hide-icon">
              {type === InputTypes.Password && (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eye-icon"
                  onClick={handleShowHideInput}
                />
              )}
              {type === InputTypes.Text && (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="eye-icon"
                  onClick={handleShowHideInput}
                />
              )}
            </div>
          )}
          {showUnitIcon && unit && <div className="unit">{unit}</div>}
          {showUnitIcon && iconName && (
            <FontAwesomeIcon
              icon={iconName}
              className="eye-icon"
              onClick={handleShowHideInput}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default InputBox;
