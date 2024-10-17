/* Import Dependencies */
import { Field } from "formik";
import { isEmpty } from "lodash";
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from "react-select";

/* Import Types */
import { FormField, Dict, DropdownItem } from "app/Types";

/* Import API */
import GetRORsByName from 'api/ror/GetRORsByName';

/* Import Components */
import { Button, Spinner } from 'components/general/CustomComponents';


/* Props Type */
type Props = {
    field: FormField,
    fieldValue: Dict,
    SetFieldValue: Function
};


/**
 * Component that renders a dynamic ROR field for defining the organisation (affiliation) identifier and name
 * @param field The provided form field
 * @param fieldValue The current value of the field
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const RORField = (props: Props) => {
    const { field, fieldValue, SetFieldValue } = props;

    /* Base variables */
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownItem[] | undefined>();

    /**
     * Function to search for RORs and fill the dropdown with options
     */
    const SearchForROR = async () => {
        setLoading(true);

        const rors = await GetRORsByName({ query });

        /* Reset field name */
        SetFieldValue(field.jsonPath.replace('$', ''), {
            "schema:identifier": '',
            "schema:name": ''
        });

        /* Construct dropdown items from ROR */
        const dropdownOptions: DropdownItem[] = [];

        rors.forEach(ror => {
            dropdownOptions.push({
                label: ror.names[0].value,
                value: ror.id
            });
        })

        setDropdownOptions(dropdownOptions);
        setLoading(false);
    };

    return (
        <div>
            <p>
                {field.title}{field.required ? <span className="tc-grey"> *</span> : ''}
            </p>
            <Row className="mt-1">
                <Col>
                    <Field name="rorSearch"
                        className="w-100 br-corner px-2 py-1"
                        onChange={(field: Dict) => setQuery(field.target.value as string)}
                    />
                </Col>
                {loading &&
                    <Col lg="auto">
                        <Spinner />
                    </Col>
                }
                <Col lg="auto">
                    <Button type="button"
                        variant="primary"
                        OnClick={() => SearchForROR()}
                    >
                        <p>
                            Search for ROR
                        </p>
                    </Button>
                </Col>
            </Row>
            {/* Display ROR selection dropdown if dropdown options is not undefiend */}
            {dropdownOptions &&
                <Row className="mt-2">
                    <Col>
                        <Select
                            options={dropdownOptions}
                            value={fieldValue['schema:identifier'] ? {
                                label: fieldValue['schema:name'],
                                value: fieldValue['schema:identifier']
                            } : undefined}
                            placeholder="Select an option"
                            onChange={(dropdownOption) => {
                                let jsonPath: string = '';

                                /* Format JSON path */
                                field.jsonPath.split('][').forEach(pathSegment => {
                                    const localPathSegment = pathSegment.replace('$', '').replace('[', '').replace(']', '').replaceAll("'", '');

                                    if (!isNaN(Number(localPathSegment))) {
                                        jsonPath = jsonPath.concat(`[${localPathSegment}]`);
                                    } else {
                                        jsonPath = jsonPath.concat(`['${localPathSegment}']`);
                                    }
                                });

                                SetFieldValue(jsonPath, {
                                    "schema:identifier": dropdownOption?.value,
                                    "schema:name": dropdownOption?.label
                                });
                            }}
                        />
                    </Col>
                </Row>
            }
        </div>
    );
};

export default RORField;