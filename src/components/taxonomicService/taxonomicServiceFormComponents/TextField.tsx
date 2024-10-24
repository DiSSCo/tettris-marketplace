/* Import Dependencies */
import classNames from 'classnames';
import { Field } from "formik";

/* Import Types */
import { FormField } from "app/Types";


/* Props Type */
type Props = {
    field: FormField
};


/**
 * Component that renders an input text field for a free, long text insert
 * @param field The provided form field
 * @returns JSX Component
 */
const TextField = (props: Props) => {
    const { field } = props;

    /* Class Names */
    const formFieldClass = classNames({
        'b-primary': field.required
    });

    return (
        <div>
            <p>
                {field.title}{field.required ? <span className="tc-grey"> *</span> : ''}
            </p>
            <Field name={field.jsonPath.replace('$', '')}
                as="textarea"
                rows="6"
                className={`${formFieldClass} w-100 mt-1 py-1 px-2 br-corner`}
            />
        </div>
    );
};

export default TextField;