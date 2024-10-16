/* Import Dependencies */
import Select from "react-select";

/* Import Types */
import { FormField } from "app/Types";


/* Props Type */
type Props = {
    field: FormField,
    SetFieldValue: Function
};


/**
 * Component that renders a select field for single selection
 * @param field The provided form field
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const SelectField = (props: Props) => {
    const { field, SetFieldValue } = props;

    /* Base variables */
    const jsonPath = field.jsonPath.replace('$', '');
    const selectItems: {
        label: string,
        value: string
    }[] = [];

    /* Construct select items */
    field.options?.forEach(option => {
        selectItems.push({
            label: option,
            value: option
        });
    });

    return (
        <div>
            <p>
                {field.title}{field.required ? <span className="tc-grey"> *</span> : ''}
            </p>
            <Select
                placeholder="Select an option"
                options={selectItems}
                onChange={(dropdownOption) => SetFieldValue(jsonPath, dropdownOption?.value)}
            />
        </div>
    );
};

export default SelectField;