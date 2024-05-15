/* Import Dependencies */
import classNames from 'classnames';

/* Import Styles */
import styles from './buttons.module.scss';


/* Props Type */
interface Props {
    children?: string | JSX.Element,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary' | 'tertiary' | 'blank',
    className?: string,
    OnClick?: Function
};


/** Component that renders a custom button according to the appliation's style
    * @param children String to be placed in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param className Additional class names to be added to the button
    * @param OnClick The event to be fired when clicking on the button
*/
const Button = (props: Props) => {
    const { children, type, variant, className, OnClick } = props;

    /* ClassNames */
    const buttonClass = classNames({
        'px-4 py-2': variant !== 'blank',
        [`${className}`]: className,
        'fs-4': !className?.includes('fs')
    });

    return (
        <button type={type}
            className={`${styles.button} ${styles[variant]} ${buttonClass} fw-bold b-none br-round`}
            onClick={() => OnClick?.()}
        >
            {children ?? ''}
        </button>
    );
};

export default Button;