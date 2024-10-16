/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { FormField } from "app/Types";

/* Import Icons */
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { Button } from "components/general/CustomComponents";


/* Props Type */
type Props = {
    field: FormField,
    fieldValues: string[]
};


/**
 * Component that returns a section of an array with string fields in the form
 * @param field The provided form field
 * @param fieldValues The current values of the field in the form state
 * @returns JSX Component
 */
const StringArrayField = (props: Props) => {
    const { field, fieldValues } = props;

    /* Base variables */
    const jsonPath = field.jsonPath.replace('$', '');

    return (
        <div>
            <FieldArray name={field.jsonPath.replace('$', '')}>
                {({ push, remove }) => (
                    <div>
                        <Row>
                            <Col>
                                <p>
                                    {field.title}{field.required ? <span className="tc-grey"> *</span> : ''}
                                </p>
                            </Col>
                            <Col lg="auto">
                                <Button type="button"
                                    variant="blank"
                                    className="px-0 py-0"
                                    OnClick={() => push('')}
                                >
                                    <p className="tc-primary">
                                        Add field
                                    </p>
                                </Button>
                            </Col>
                        </Row>
                        {fieldValues.map((_fieldValue, index) => {
                            const key = `${jsonPath}-${index}`;

                            return (
                                <Row key={key}
                                    className="mt-2"
                                >
                                    <Col className="ps-4">
                                        <Field name={`${jsonPath}[${index}]`}
                                            className="w-100 py-1 px-2 br-corner"
                                        />
                                    </Col>
                                    {fieldValues.length > 1 &&
                                        <Col lg="auto"
                                            className="d-flex align-items-center"
                                        >
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0"
                                                OnClick={() => remove(index)}
                                            >
                                                <FontAwesomeIcon icon={faX}
                                                    className="tc-grey"
                                                    size="lg"
                                                />
                                            </Button>
                                        </Col>
                                    }
                                </Row>
                            );
                        })}
                    </div>
                )}
            </FieldArray>
        </div>
    );
};

export default StringArrayField;