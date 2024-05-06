/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { Agent } from 'app/Types';

/* Import Components */
import DetailsBlockArray from './DetailsBlockArray';


/* Props Type */
type Props = {
    name: string,
    properties: {
        [property: string]: string | number | string[] | Agent[] | undefined
    }
};


/**
 * Component that renders a details block for on the taxonomic service page
 * @param properties An object containing all the properties to be show in the details block
 * @returns JSX Component
 */
const DetailsBlock = (props: Props) => {
    const { name, properties } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* Name of block */}
            <Row>
                <Col className="col-md-auto">
                    <div className="bgc-primary px-4 py-1">
                        <p className="fw-lightBold">{name}</p>
                    </div>
                </Col>
            </Row>
            {/* Properties content */}
            <Row className="flex-grow-1">
                <Col>
                    <div className="h-100 b-primary px-4 py-3">
                        {Object.entries(properties).map(([key, value]) => (
                            <Row key={key}
                                className="mb-2"
                            >
                                <Col>
                                    {
                                        Array.isArray(value) ?
                                            <DetailsBlockArray name={key}
                                                propertiesArray={value}
                                            />
                                            : <>
                                                <p className="fs-5 fw-bold">{MakeReadableString(key)}</p>
                                                <p>{!isEmpty(value) ? value : 'Not defined'}</p>
                                            </>
                                    }
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DetailsBlock;