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
 * Component that renders a select field for multi selection
 * @param field The provided form field
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const MultiSelectField = (props: Props) => {
    const { field, SetFieldValue } = props;

    /* Base variables */
    const jsonPath = field.jsonPath.replace('$', '');
    const selectItems: {
        label: string,
        value: string
    }[] = [];

    /* Construct select items */
    field.options?.forEach(option => {
        /* Define label */
        let label: string = '';

        if (field.mapping) {
            if (typeof(field.mapping) === 'object') {
                label = field.mapping[option]
            }
        } else {
            label = option;
        }

        selectItems.push({
            label,
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
                isMulti={true}
                onChange={(dropdownOptions) => {
                    /* Create array of all dropdown options values */
                    const valuesArray: string[] = [];
                    
                    dropdownOptions.forEach(dropdownOption => {
                        valuesArray.push(dropdownOption.value);
                    });

                    SetFieldValue(jsonPath, valuesArray);
                }}
            />
        </div>
    );
};

export default MultiSelectField;