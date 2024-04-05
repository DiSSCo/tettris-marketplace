/* Import Dependencies */
import Select from "react-select";

/* Import Types */
import { SingleValue } from "react-select";
import { DropdownItem } from "app/Types";


/* Props Type */
interface Props {
    items: {
        label: string,
        value: string,
        action?: Function
    }[],
    selectedItem?: {
        label: string,
        value: string,
    },
    placeholder?: string,
    styles?: {
        color?: string
    },
    OnChange?: Function
};


/** Component that renders a default dropdown with selectable items, each item will trigger an action
    * @param items An array of items to be rendered, an item consists of a label, value and action
    * @param selectedItem The currently selected item, holds a label and value
    * @param placeholder A possible placeholder to display when in the field when no option is selected
    * @param styles A possible object that can hold rules for adhering to certain styles
    * @param OnChange A global function that triggers when an option is selected, has priority over an action of an option
*/
const Dropdown = (props: Props) => {
    const { selectedItem, items, placeholder, styles, OnChange } = props;

    return (
        <Select
            value={selectedItem ?? { value: '', label: placeholder ?? 'Select an item', action: () => {} }}
            options={items}
            className="tc-white"
            isSearchable={false}
            styles={{
                control: provided => ({
                    ...provided,
                    backgroundColor: '#ffffff',
                    borderRadius: 'none',
                    borderColor: '#333333',
                    minHeight: 'auto',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.3rem',
                    paddingBottom: '0.3rem',
                    ":hover": {
                        borderColor: `${styles?.color}`
                    },
                    ":active": {
                        borderColor: `${styles?.color}`
                    }
                }),
                menu: provided => ({
                    ...provided,
                    zIndex: 100000,
                    fontSize: '0.875rem',
                    width: '100%',
                    position: 'absolute',
                    right: '0',
                    color: '#333333'
                }),
                placeholder: provided => ({
                    ...provided,
                    color: '#FF8E3E'

                }),
                dropdownIndicator: provided => ({
                    ...provided,
                    color: '#333333',
                    fontSize: '0.875rem'
                }),
                singleValue: provided => ({
                    ...provided,
                    color: '#333333'
                }),
                valueContainer: provided => ({
                    ...provided,
                    width: 'max-content',
                    padding: '0px',
                    
                }),
                clearIndicator: provided => ({
                    ...provided,
                    padding: '0px'
                }),
                indicatorsContainer: provided => ({
                    ...provided,
                    height: '1.5rem'
                }),
                input: provided => ({
                    ...provided,
                    margin: '0px'
                }),
                indicatorSeparator: provided => ({
                    ...provided,
                    display: 'none'
                }),
                option: (provided, state) => ({
                    ...provided,
                    width: '100%',
                    backgroundColor: (state.isSelected && styles?.color) ? styles.color : undefined,
                    ":hover": {
                        backgroundColor: !state.isSelected ? '#f1f1f3' : undefined
                    },
                    fontWeight: state.isSelected ? 'bold' : ''
                })
                
            }}
            onChange={(option: SingleValue<DropdownItem>) => OnChange ? OnChange(option) : option?.action ? option.action() : null}
        />
    );
}

export default Dropdown;