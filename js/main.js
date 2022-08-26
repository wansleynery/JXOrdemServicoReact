const {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Avatar,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogTitle,
    Fab,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListItemSecondaryAction,
    Radio,
    SvgIcon,
    Switch,
    TextField,
    Tooltip,
    Typography
} = MaterialUI;

window.onerror = function (event, _url, _line, _col, _error) {

    toastr.error (
        event.replace ('Uncaught Error: ', ''),
        'Encontramos um erro...',
        {
            timeOut: 15000,
            preventDuplicates: true
        }
    );

    return false;
}