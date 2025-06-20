const  validations=require("./form-validations.json");

export const validateForm = (formFields) => {
    const errors = {};
    Object.keys(formFields).forEach((field) => {
        const value = formFields[field];
        const rules = validations[field];

        if (rules?.required?.value && value.length === 0) {
            errors[field] = rules.required.message;
            return;
        }

        if (rules?.minLength && value.length < rules.minLength.value) {
            errors[field] = rules.minLength.message;
            return;
        }

        if (rules?.pattern && !new RegExp(rules.pattern.value).test(value)) {
            errors[field] = rules.pattern.message;
            return;
        }
    });
    if (formFields.hasOwnProperty('confirmPassword')) {
        if (formFields.confirmPassword !== formFields.password) {
            errors.confirmPassword = "Passwords do not match.";
        }
    }
    if( Object.keys(errors).length > 0) {
        return {
            isValid: false,
            errors
        };
    }
    return {
        isValid: true
    };
};