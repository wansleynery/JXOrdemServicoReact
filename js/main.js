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

/**
let div = document.createElement ('iframe');
div.src = '/m7serv/PortalGerenteM7.xhtml5?resourceID=br.com.sankhya.PortalGerenteM7';
div.id = 'toRecoverID';
div.style.display = 'none';
document.body.appendChild (div);

var toRecoverID = document.getElementById ('toRecoverID');
let toRecoverElement = null;
setTimeout (() => toRecoverElement = 'contentDocument' in toRecoverID ? toRecoverID.contentDocument : toRecoverID.contentWindow.document, 5000);
*/