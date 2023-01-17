import { InputText } from 'primereact/inputtext'
import { useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';


const TextEditor = (props => {
    const submitted = useSelector((state) => state.ui.submitted)
    return (
        <InputText
            type="text"
            style={{ width: '100%' }}
            value={props.options.value}
            onChange={(e) => props.options.editorCallback(e.target.value)}
            required
            autoFocus
            className={props.obligatoire && classNames({ 'p-invalid': !props.options.value })}
        />
    )
})

export default TextEditor;