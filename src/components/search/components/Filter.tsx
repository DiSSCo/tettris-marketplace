/* Import Types */
import { Filter as FilterType, DropdownItem } from "app/Types";

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Components */
import { Dropdown, DatePicker } from 'components/general/FormComponents';


/* Props Type */
type Props = {
    filter: FilterType,
    currentValue?: string | number | boolean | Date,
    SetFilterValue: Function
};


/** Component that renders a filter based upon the provided filter type
    * @param filter The filter object holding a name, type and possible other properties
    * @param currentValue The current value chosen for the filter
    * @param SetFilterValue Function to set the filter value when changed
*/
const Filter = (props: Props) => {
    const { filter, currentValue, SetFilterValue } = props;

    switch (filter.type) {
        case 'select':
            if (filter.options) {
                const selectedOption: DropdownItem | undefined = filter.options.find((option) => option.value === currentValue);

                return <Dropdown items={filter.options}
                    selectedItem={currentValue ? {
                        label: MakeReadableString(selectedOption?.label ?? `${currentValue}`),
                        value: `${currentValue}`
                    } : undefined}
                    placeholder={MakeReadableString(filter.name)}
                    styles={{
                        color: '#FF8E3E'
                    }}
                    OnChange={(item: DropdownItem) => SetFilterValue(item.value)}
                />
            }
            return <> </>;
        case 'date':
            return <DatePicker selected={currentValue instanceof Date ? currentValue : undefined}
                placeholder="Publishing date"
                OnChange={(date: Date) => SetFilterValue(date)}
            />
        default:
            return <> </>
    }
}

export default Filter;