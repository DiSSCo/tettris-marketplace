/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Utilities */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { Author, Maintainer, Funder } from "app/Types";


/* Props Type */
type Props = {
    name: string,
    objectsArray: Maintainer[] | Author[] | Funder[]
};


/**
 * Component that renders a details block that represents a person and the affiliated organisation
 * @returns JSX Component
 */
const PersonAffiliation = (props: Props) => {
    const { name, objectsArray } = props;

    return (
        <div className="horizontalScroll d-flex">
            {objectsArray.map((personObject, index) => {
                const key = `${personObject["@type"]}-${index}`;

                if (personObject["@type"] === 'schema:person') {
                    return (
                        <div key={key}
                            className={`${index >= 1 ? 'ms-2' : ''} d-inline-block bgc-grey-light px-2 py-1`}
                        >
                            {/* Title */}
                            <p className="fs-5 fw-bold">
                                {`${Capitalize(name.replace('s', ''))} #${index + 1}`}
                            </p>
                            {/* Person information */}
                            <Row>
                                <Col>
                                    {Array.isArray(personObject["schema:identifier"]) ?
                                        <>
                                            {personObject['schema:identifier'].map((identifierObject, index) => {
                                                const key = `${identifierObject}-${index}`;

                                                return (
                                                    <a key={key}
                                                        href={identifierObject}
                                                        target="_blank"
                                                        rel="noreferer"
                                                    >
                                                        <p className="tc-primary-hover">
                                                            {personObject["schema:name"] ? `${personObject["schema:name"]} - ${identifierObject}` : identifierObject}
                                                        </p>
                                                    </a>
                                                );
                                            })}
                                        </>
                                        : <a href={personObject["schema:identifier"]}
                                            target="_blank"
                                            rel="noreferer"
                                        >
                                            <p className="tc-primary-hover">
                                                {personObject["schema:name"] ?? personObject["schema:identifier"]}
                                            </p>
                                        </a>
                                    }
                                </Col>
                            </Row>
                            {/* Organisation information */}
                            <Row>
                                <Col>
                                    <a href={personObject["schema:Affiliation"]["schema:identifier"]}
                                        target="_blank"
                                        rel="noreferer"
                                    >
                                        <p className="tc-primary-hover">
                                            {personObject["schema:Affiliation"]["schema:name"]}
                                        </p>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    );
                } else {
                    return (
                        <div key={key}
                            className={`${index >= 1 ? 'ms-2' : ''} d-inline-block bgc-grey-light px-2 py-1`}
                        >
                            {/* Title */}
                            <p className="fs-5 fw-bold">
                                {`${Capitalize(name.replace('s', ''))} #${index + 1}`}
                            </p>
                            {/* Organisation information */}
                            <Row>
                                <Col>
                                    <a href={personObject["schema:identifier"] as string}
                                        target="_blank"
                                        rel="noreferer"
                                    >
                                        <p className="tc-primary-hover">
                                            {personObject?.['schema:name' as keyof typeof personObject]}
                                        </p>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    );
                }
            })}
        </div >
    );
};

export default PersonAffiliation;