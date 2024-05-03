/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/taxonomicService/taxonomicService.module.scss';


/* Props Type */
type Props = {
    multimediaItems: {
        "erp:multimediaUrl": string
    }[]
};


const MultimediaBlock = (props: Props) => {
    const { multimediaItems } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* Name of block */}
            <Row>
                <Col className="col-md-auto">
                    <div className="bgc-primary px-4 py-1">
                        <p className="fw-lightBold">Multimedia</p>
                    </div>
                </Col>
            </Row>
            {/* Multimedia items */}
            <Row className="flex-grow-1">
                <Col>
                    <div className="h-100 b-primary px-4 py-3">
                        <Row className="justify-content-between">
                            {multimediaItems.map(multimediaItem => (
                                <Col key={multimediaItem['erp:multimediaUrl']}
                                    lg={{ span: 4 }}
                                    className="mb-3"
                                >
                                    <div className={`${styles.imageBackground} h-100 w-100 d-flex justify-content-center`}>
                                        <img src={multimediaItem['erp:multimediaUrl']}
                                            alt={multimediaItem['erp:multimediaUrl']}
                                            className={styles.multimediaItem}
                                        />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MultimediaBlock;