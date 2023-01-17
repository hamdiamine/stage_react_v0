import { Calendar } from 'primereact/calendar';

const CustomDateRangePicker = (props) => {
    return (
        <span className="p-float-label">
            <Calendar id={props.id} value={props.value} onChange={props.onChange} selectionMode="range" dateFormat="dd/mm/yy" />
            <label htmlFor={props.id}>{props.label}</label>
        </span>
    )
}

export default CustomDateRangePicker;