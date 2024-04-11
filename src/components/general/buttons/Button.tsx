/* Import Styles */
import styles from './buttons.module.scss';


/* Props Type */
interface Props {
    children: string,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary',
    OnClick: Function
};


/** Component that renders a custom button according to the appliation's style
    * @param children String to be placed in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param OnClick The event to be fired when clicking on the button
*/
const Button = (props: Props) => {
    const { children, type, variant, OnClick } = props;

    return (
        <button type={type}
            className={`${styles[variant]} fs-4 fw-bold px-3 py-2 b-none`}
            onClick={() => OnClick()}
        >
            {children}
        </button>
    );
}

export default Button;