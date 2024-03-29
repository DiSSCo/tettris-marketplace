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
    * @param children Child components to be rendered in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param OnClick The event to be fired when clicking on the button
*/
const Button = (props: Props) => {
    const { children, type, variant, OnClick } = props;

    return (
        <button type={type}
            className={`${styles[variant]} px-2 py-1`}
            onClick={() => OnClick()}
        >
            {children}
        </button>
    );
}

export default Button;