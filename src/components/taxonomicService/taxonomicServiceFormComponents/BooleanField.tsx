/* Import Dependencies */
import classNames from 'classnames';
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { FormField } from "app/Types";


/* Props Type */
type Props = {
    field: FormField
};


/**
 * Component that renders an input field for a free text insert
 * @param field The provided form field
 * @returns JSX Component
 */
const BooleanField = (props: Props) => {
    const { field } = props;

    /* Class Names */
    const formFieldClass = classNames({
        'b-primary': field.required
    });

    return (
        <div>
            <Row>
                <Col lg="auto"
                    className="pe-0"
                >
                    <p>
                        {field.title}{field.required ? <span className="tc-grey"> *</span> : ''}
                    </p>
                </Col>
                <Col>
                    <Field name={field.jsonPath.replace('$', '')}
                        type="checkbox"
                        className={`${formFieldClass} mt-1 py-1 px-2 br-corner`}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default BooleanField;