import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils';


const NumberEditor = (props) => {
    return (
        <InputText
            type="number"
            style={{ width: '100%' }}
            value={props.options.value}
            onChange={(e) => props.options.editorCallback(e.target.value)}
            required
            autoFocus
            className={props.obligatoire && classNames({ 'p-invalid': !props.options.value })}

        />
    )
}

export default NumberEditor;