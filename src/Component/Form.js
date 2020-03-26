import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            padding: '5px 0'
        },
    },
}));

export default function BasicTextFields(props) {
    // Deconstruc
    const { fetch } = props;

    const classes = useStyles();
    const [meal, setMeal] = React.useState('')

    //*** Handle Submit */
    let handleSubmit = (e) => {
        e.preventDefault();
        // Fetch new meals
        fetch(meal);
        // Reset input field
        setMeal('');

    }


    //*** RETURN */
    return (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <TextField
                value={meal}
                onChange={e => setMeal(e.target.value)}
                id="outlined-basic"
                label="Insert and press ENTER"
                variant="outlined" />
        </form>
    );
}
