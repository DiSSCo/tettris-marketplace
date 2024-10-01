/* Import Dependencies */
import ReactDatePicker from "react-datepicker";

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";


/* Props Type */
type Props = {
    selected?: Date,
    placeholder?: string,
    OnChange: Function
};


/** Component that renders a Date Picker field, provides a menu for easy data selection
    * @param OnChange Function that is triggered on change of the datepicker's value
*/
const DatePicker = (props: Props) => {
    const { selected, placeholder, OnChange } = props;

    return (

        <label className="h-100 w-100 position-relative d-flex flex-column justify-content-center">
            <ReactDatePicker selected={selected}
                className="h-100 w-100 fs-4 py-1 px-2"
                placeholderText={placeholder ?? 'Select a date'}
                onChange={(date) => OnChange(date)}
            />

            <div className="bgc-none b-none fs-4 position-absolute end-0 me-3 z--1">
                <FontAwesomeIcon icon={faCalendar} />
            </div>
        </label>

    );
}

export default DatePicker;