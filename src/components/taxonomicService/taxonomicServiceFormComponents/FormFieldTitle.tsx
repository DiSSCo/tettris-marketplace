/* Import Dependencies */
import jp from 'jsonpath';
import { isEmpty } from "lodash";
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { FormField, Dict } from "app/Types";


/* Props Type */
type Props = {
    field: FormField,
    values: Dict
};


/**
 * Component that renders the title segmen for a form field
 * @param field The form field that is rendered
 * @param values The current values in the form state
 * @returns JSX Component
 */
const FormFieldTitle = (props: Props) => {
    const { field, values } = props;

    return (
        <Row>
            <Col lg="auto"
                className="pe-0"
            >
                <p>
                    {field.title}
                </p>
            </Col>
            {(field.required && !isEmpty(values) && !jp.value(values, field.jsonPath)) &&
                <Col className="d-flex align-items-center">
                    <p className="fs-4 tc-error">
                        This field is required
                    </p>
                </Col>
            }
        </Row>
    );
};

export default FormFieldTitle;