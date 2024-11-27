/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Utilities */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { Author, Maintainer, Funder } from "app/Types";

/* Import Webroot */
import githubIcon from 'webroot/img/githubLogo.png';
import ORCIDIcon from 'webroot/img/ORCIDLogo.png';

/* Import Styles */
import styles from '../taxonomicService.module.scss';


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
                                                        <Row>
                                                            {(identifierObject.toLowerCase().includes('orcid') || identifierObject.toLowerCase().includes('github')) &&
                                                                <Col xs="auto" lg="auto"
                                                                    className="pe-0"
                                                                >
                                                                    <img src={identifierObject.toLowerCase().includes('orcid') ? ORCIDIcon : githubIcon}
                                                                        alt="Identifier icon"
                                                                        className={styles.identifierLogo}
                                                                    />
                                                                </Col>
                                                            }
                                                            <Col>
                                                                <p className="tc-primary-hover">
                                                                    {personObject["schema:name"] ? `${personObject["schema:name"]} - ${identifierObject}` : identifierObject}
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </a>
                                                );
                                            })}
                                        </>
                                        : <a href={personObject["schema:identifier"]}
                                            target="_blank"
                                            rel="noreferer"
                                        >
                                            <Row>
                                                {((personObject["schema:identifier"] as string).toLowerCase().includes('orcid') ||
                                                    (personObject["schema:identifier"] as string).toLowerCase().includes('github')
                                                ) &&
                                                    <Col xs="auto" lg="auto"
                                                        className="pe-0"
                                                    >
                                                        <img src={(personObject["schema:identifier"] as string).toLowerCase().includes('orcid') ? ORCIDIcon : githubIcon}
                                                            alt="Identifier icon"
                                                            className={styles.identifierLogo}
                                                        />
                                                    </Col>
                                                }
                                                <Col>
                                                    <p className="tc-primary-hover">
                                                        {personObject["schema:name"] ?? personObject["schema:identifier"]}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </a>
                                    }
                                </Col>
                            </Row>
                            {/* Organisation information */}
                            <Row>
                                <Col>
                                    <a href={personObject["schema:affiliation"]["schema:identifier"]}
                                        target="_blank"
                                        rel="noreferer"
                                    >
                                        <p className="tc-primary-hover">
                                            {personObject["schema:affiliation"]["schema:name"]}
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