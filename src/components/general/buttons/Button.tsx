/* Import Styles */
import styles from './buttons.module.scss';


/* Props Type */
interface Props {
    children: string,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary',
    Event: Function
};


const Button = (props: Props) => {
    const { children, type, variant, Event } = props;

    return (
        <button type={type}
            className={`${styles[variant]} px-2 py-1`}
            onClick={() => Event()}
        >
            {children}
        </button>
    );
}

export default Button;