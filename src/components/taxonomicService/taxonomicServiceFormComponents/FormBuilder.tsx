/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FieldArray } from "formik";
import jp from 'jsonpath';
import { cloneDeep } from "lodash";
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from "app/Utilities";

/* Import Types */
import { FormField, Dict } from "app/Types";

/* Import Icons */
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import DateField from "./DateField";
import MultiSelectField from "./MultiSelectField";
import SelectField from "./SelectField";
import StringField from "./StringField";
import StringArrayField from "./StringArrayField";
import TextField from "./TextField";
import { Button } from "components/general/CustomComponents";


/* Props Type */
type Props = {
    formTemplate: {
        [formSection: string]: {
            title: string,
            type: string,
            jsonPath?: string,
            fields: FormField[]
        }
    }
};


/**
 * Component that renders a form builder for rendering forms based on JSON files
 * @param formTemplate The form template to build the form from
 * @returns JSX Component
 */
const FormBuilder = (props: Props) => {
    const { formTemplate } = props;

    /* Base variables */
    const formSections: {
        [section: string]: {
            type: string,
            jsonPath: string,
            fields: FormField[]
        }
    } = {};
    const initialFormValues: Dict = {};

    /**
     * Function to flatten a JSON path
     * @returns flattened JSON path string
     */
    const FlattenJSONPath = (jsonPath: string): string => {
        return jsonPath.replaceAll('[', '_').replaceAll(']', '').replaceAll("'", '');
    };

    /**
     * Function to determine the initial form field type 
     * @param fieldType
     */
    const DetermineInitialFormValue = (fieldType: string) => {
        switch (fieldType) {
            case 'boolean':
                return false;
            case 'array':
                return [];
            case 'multi-string':
                return [''];
            case 'ror':
                return {
                    "schema:identifier": '',
                    "schema:name": ''
                };
            default:
                return '';
        };
    };

    /* Construct initial form values */
    Object.entries(formTemplate).forEach(([_key, formSection]) => {
        formSections[formSection.title] = {
            type: formSection.type,
            jsonPath: formSection.jsonPath ?? '',
            fields: []
        };

        /* If is array, push to initial form values */
        if (formSection.type === 'array') {
            jp.value(initialFormValues, formSection.jsonPath ?? '', []);
        }

        formSection.fields.forEach(field => {
            let jsonPath: string = '';

            if (formSection.type === 'array') {
                let pathSuffix: string = FlattenJSONPath(field.jsonPath).split('_').at(-1) as string;

                jsonPath = jsonPath.concat(`${formSection.jsonPath ?? ''}[0]['${pathSuffix}']`);

                /* Add to initial form values array zero index */
                jp.value(initialFormValues, jsonPath, DetermineInitialFormValue(field.type));
            } else {
                jsonPath = jsonPath.concat(FlattenJSONPath(field.jsonPath));

                /* Add to initial form values */
                jp.value(initialFormValues, field.jsonPath, DetermineInitialFormValue(field.type));
            }

            /* Push to form fields */
            formSections[formSection.title].fields.push(field);
        });
    });

    /* Function to construct form field based upon given field */
    const ConstructFormField = (field: FormField, fieldValues?: any, SetFieldValue?: Function) => {
        switch (field.type) {
            case 'date':
                let dateValue: Date;

                if (fieldValues) {
                    dateValue = new Date(fieldValues);
                } else {
                    dateValue = new Date();
                }

                return <DateField field={field}
                    fieldValue={dateValue}
                    SetFieldValue={(fieldName: string, value: string) => SetFieldValue?.(fieldName, value)}
                />
            case 'multi-string':
                return <StringArrayField field={field}
                    fieldValues={fieldValues as string[]}
                />
            case 'select':
                return <SelectField field={field}
                    SetFieldValue={(fieldName: string, value: string) => SetFieldValue?.(fieldName, value)}
                />
            case 'multi-select':
                return <MultiSelectField field={field}
                    SetFieldValue={(fieldName: string, value: string) => SetFieldValue?.(fieldName, value)}
                />
            case 'text':
                return <TextField field={field} />
            default:
                return <StringField field={field} />
        };
    };

    return (
        <div>
            <Formik initialValues={initialFormValues}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    console.log(values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {Object.entries(formSections).map(([title, section]) => (
                            <Row key={title}>
                                <Col>
                                    {section.type === 'object' ?
                                        <div className="mt-4">
                                            <p className="fw-lightBold">{`${title}`}</p>

                                            {section.fields.map(field => (
                                                <Row key={field.jsonPath}
                                                    className="mt-2"
                                                >
                                                    <Col>
                                                        {ConstructFormField(field, jp.value(values, field.jsonPath), setFieldValue)}
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                        : <FieldArray name={section.jsonPath.replace('$', '')}>
                                            {({ push, remove }) => (
                                                <div className="mt-4">
                                                    <Row>
                                                        <Col>
                                                            <p className="fw-lightBold">{`${title}${title.at(-1) !== 'a' ? 's' : ''}`}</p>
                                                        </Col>
                                                        <Col lg="auto">
                                                            <Button type="button"
                                                                variant="blank"
                                                                className="px-0 py-0"
                                                                OnClick={() => {
                                                                    push(jp.value(initialFormValues, section.jsonPath)[0]);
                                                                }}
                                                            >
                                                                <p className="tc-primary">
                                                                    {`Add ${title}`}
                                                                </p>
                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                    {jp.value(values, section.jsonPath).map((_fields: Dict, index: number) => {
                                                        const key = `${section.jsonPath}-${index}`;

                                                        return (
                                                            <div key={key}
                                                                className="mt-2 px-3 py-2 b-grey"
                                                            >
                                                                <Row>
                                                                    <Col>
                                                                        <p className="fw-lightBold">
                                                                            {`${title} #${index + 1}`}
                                                                        </p>
                                                                    </Col>
                                                                    {jp.value(values, section.jsonPath).length > 1 &&
                                                                        <Col lg="auto">
                                                                            <Button type="button"
                                                                                variant="blank"
                                                                                OnClick={() => remove(index)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faX}
                                                                                    className="tc-grey"
                                                                                />
                                                                            </Button>
                                                                        </Col>
                                                                    }
                                                                </Row>
                                                                <Row className="my-2">
                                                                    <Col>
                                                                        {formSections[MakeReadableString(FlattenJSONPath(section.jsonPath)).split(' ').slice(1).join(' ')].fields.map(field => {
                                                                            let localField = cloneDeep(field);

                                                                            localField.jsonPath = field.jsonPath.replace('index', String(index));

                                                                            return (
                                                                                <Row>
                                                                                    <Col>
                                                                                        {ConstructFormField(localField, jp.value(values, localField.jsonPath))}
                                                                                    </Col>
                                                                                </Row>
                                                                            );
                                                                        })}
                                                                    </Col>
                                                                </Row>

                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </FieldArray>
                                    }
                                </Col>
                            </Row>
                        ))}
                        <Row className="mt-4">
                            <Col>
                                <Button type="submit"
                                    variant="primary"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormBuilder;