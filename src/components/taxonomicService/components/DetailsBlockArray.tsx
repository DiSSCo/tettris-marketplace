/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { Maintainer, Dict } from 'app/Types';


/* Props Type */
type Props = {
    name: string,
    propertiesArray: string[] | Dict[] | Maintainer[]
};


/**
 * Component that renders an array of property blocks based upon the properties array
 * @param name The name of the property
 * @param propertiesArray An array containing the properties' values, either strings or objects
 * @returns JSX Component
 */
const DetailsBlockArray = (props: Props) => {
    const { name, propertiesArray } = props;

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <p className="fs-5 fw-bold">{MakeReadableString(name)}</p>
                    </Col>
                </Row>
                <Row className="w-100 overflow-x-scroll flex-nowrap">
                    {/* For each property in properties array, render an inline block */}
                    {propertiesArray.map((property) => (
                        <Col key={typeof(property) === 'object' ? Object.keys(property)[0] : property}
                            className="col-lg-auto pe-0"
                        >
                            <div className="bgc-grey-light mt-1 px-2 py-1 textOverflow">
                                {typeof (property) === 'object' ?
                                    Object.entries(property).map(([key, value]) => (
                                        <div key={key}
                                            className="my-1"
                                        >
                                            <p className="fs-5 fw-bold">{MakeReadableString(key.replace('cetaf:', ''))}</p>
                                            <p className="fs-4">{value}</p>
                                        </div>
                                    ))
                                    : <div>
                                        <p className="fs-4 fw-lightBold">{property}</p>
                                    </div>
                                }
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

export default DetailsBlockArray;