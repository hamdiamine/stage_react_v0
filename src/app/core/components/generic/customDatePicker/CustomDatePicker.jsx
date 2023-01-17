import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import TextField from '@mui/material/TextField';

const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
    de: deLocale,
};

const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
};

const CustomDatePicker = (props) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[props.locale]}>
            <DatePicker
                size="small"
                id={props.id}
                disableFuture={props.disableFuture}
                disabled={props.disabled}
                label={props.label}
                mask={maskMap[props.locale]}
                value={props.value}
                onChange={props.onChange}
                minDate={props.minDate}
                maxDate={props.maxDate}
                renderInput={(params) => <TextField {...params} size="small" error={props.error}
                    helperText={props.helperText} />}
            />
        </LocalizationProvider>
    )
}

export default CustomDatePicker
