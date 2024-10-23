/* Import Dependencies */
import classNames from 'classnames';
import { Field } from "formik";
import jp from 'jsonpath'
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { FormField, Dict } from "app/Types";


/* Props Type */
type Props = {
    field: FormField,
    values: Dict
};


/**
 * Component that renders an input text field for a free, long text insert
 * @param field The provided form field
 * @param values The current values in the form state
 * @returns JSX Component
 */
const TextField = (props: Props) => {
    const { field, values } = props;

    /* Class Names */
    const formFieldClass = classNames({
        'b-error': (field.required && !isEmpty(values) && !jp.value(values, field.jsonPath))
    });

    return (
        <div>
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
            <Field name={field.jsonPath.replace('$', '')}
                as="textarea"
                rows="6"
                className={`${formFieldClass} w-100 mt-1 py-1 px-2 br-corner`}
            />
        </div>
    );
};

export default TextField;