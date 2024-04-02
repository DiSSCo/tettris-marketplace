/* Import Dependencies */
import { useState } from "react"
import CountUp from 'react-countup';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from '../home.module.scss';


/* Props Type */
interface Props {
    title: string,
    subTitle: string,
    count: number,
    color: 'primary' | 'secondary' | 'tertiary'
};


/** Component that renders a template for the category selection on the Home page
    * @param title The title of the category that should be displayed in large font
    * @param subTitle The text that will appear in smaller font below the title
    * @param count The total count of records the category holds
    * @param color The color code of the category indicated by the CSS order of: primary, secondary and tertiary
*/
const HomeCategory = (props: Props) => {
    const { title, subTitle, count, color } = props;

    /* Base variables */
    const [active, setActive] = useState<boolean>(false);

    /* ClassNames */
    const hoverDivClass = classNames({
        [`${styles.homeCategoryBar} bgc-${color} py-3 tr-smooth z-1 position-absolute`]: true,
        'h-100': active
    });

    const textClass = classNames({
        'tc-white': active
    });

    return (
        <Row className="h-100 position-relative"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {/* Colored Bar, will extend to the bottom when hovered on this component */}
            <div className={hoverDivClass} />

            <Col className="flex-grow-1 mt-1 z-2">
                {/* Content of the category */}
                <Row className="pt-5 pb-5">
                    <Col className="text-center">
                        <p className={`${textClass} fs-1 tc-${color} fw-bold tr-smooth`}>
                            <CountUp end={count} />
                        </p>
                        <p className={`${textClass} fs-subTitle fw-lightBold tr-smooth`}>{title}</p>
                        <p className={`${textClass} fs-2 fw-lightBold tr-smooth`}>{subTitle}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default HomeCategory;