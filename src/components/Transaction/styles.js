import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    button: {
        margin: '20px',
        marginBottom: '20px',
    },
    typography: {
        marginTop: '30px',
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
}));