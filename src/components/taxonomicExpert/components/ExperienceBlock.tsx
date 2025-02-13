/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Props Type */
type Props = {
    name: string,
};


/**
 * Component that renders a details block for on the taxonomic service page
 * @param properties An object containing all the properties to be show in the details block
 * @returns JSX Component
 */
const ExperienceBlock = (props: Props) => {
    const { name } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* Name of block */}
            <Row>
                <Col className="col-md-auto">
                    <div className="bgc-tertiary px-4 py-1">
                        <p className="fw-lightBold">{name}</p>
                    </div>
                </Col>
            </Row>
            {/* Properties content */}
            <Row className="flex-grow-1">
                <Col>
                    <div className="h-100 b-tertiary px-4 py-3">
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ExperienceBlock;