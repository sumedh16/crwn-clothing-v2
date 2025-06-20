import { forwardRef } from "react";
import "./form-input.styles.scss";

const FormInput = forwardRef(({ label, error, ...otherProps }, ref) => (
  <div className="form-item">
    <input className="form-input" ref={ref} {...otherProps} />
    {label && (
      <label
        className={`${
          otherProps?.value?.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    )}
    {error && <span style={{ color: "red", fontSize: 14 }}>{error}</span>}
  </div>
));

export default FormInput;