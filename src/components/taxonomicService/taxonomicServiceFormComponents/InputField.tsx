/* Import Dependencies */
import { Field } from "formik";


/* Props Type */
type Props = {
    name: string,
    title: string
};


/**
 * Component that renders an input field for a free text insert
 * @param name The name of the form field
 * @param title The title that should be displayed along the form field
 * @returns JSX Component
 */
const InputField = (props: Props) => {
    const { name, title } = props;

    return (
        <div>
            <p>
                {title}
            </p>
            <Field name={name}
                className="w-100"
            />
        </div>
    );
};

export default InputField;