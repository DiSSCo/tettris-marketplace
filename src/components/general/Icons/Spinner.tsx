/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/* Import Styles */
import styles from './icons.module.scss';


const Spinner = () => {
    return (
        <FontAwesomeIcon icon={faSpinner}
            className={`${styles.spinner} fs-2 my-2`}
        />
    );
}

export default Spinner;