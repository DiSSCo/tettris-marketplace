/* Import Dependencies */
import { Field } from "formik";


/* Props Type */
interface Props {
    children?: JSX.Element,
    name: string,
    placeholder?: string
};


/** Component that renders a simple input bar for entering a query,
 * must be nested inside a Formik form
    * @param children Possible icon to display in the input bar
    * @param name The name of the input form field
    * @param placeholder A possible placeholder for the input form field
*/
const QueryBar = (props: Props) => {
    const { children, name, placeholder } = props;

    return (
        <div className="h-100 w-100 position-relative d-flex flex-column justify-content-center">
            <Field name={name}
                placeholder={placeholder && placeholder}
                className="w-100 py-1 px-2"
            />

            {children &&
                <button type="submit"
                    className="bgc-none b-none fs-4 position-absolute end-0 me-2"
                >
                    {children}
                </button>
            }
        </div>
    );
}

export default QueryBar;