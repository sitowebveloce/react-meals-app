import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';


const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        maxWidth: 400,
        width: 260
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    cardExpandBtn: {

    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'white',
        width: '42px',
        height: '42px'
    },
}));

export default function RecipeReviewCard(props) {
    // Deconstruct props
    const { meal } = props;
    //*** STATE */
    // const [ingredients, setIngredients] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);

    //*** CREATE ARRAY OF INGREDIENTS */
    let ing = [];
    for (let i = 0; i <= 20; i++) {
        // console.log(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        // console.log(`${meal[`strMeasure${i}`]}`)

        if (`${meal[`strIngredient${i}`]}` !== undefined && `${meal[`strIngredient${i}`]}` !== null && `${meal[`strIngredient${i}`]}` !== '') {
            ing.push(`${meal[`strIngredient${i}`]} = ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    // console.log(ing)
    //*** Set State ingredients */ 
    React.useEffect(() => {
        // setIngredients({ ing });

    }, []);
    //*** Styles */
    const classes = useStyles();

    //*** Open more info  */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //*** */ Handle ingredients
    let handleIngredients = () => {
        setExpanded2(!expanded2);
    }

    //*** INGREDIENT OBJECT TO RENDER */
    let ingObject = ing.map((i, indx) => (
        <div key={indx}>
            {i === 'undefined = undefined' || i === 'null = ' ? '' : i}
            <br />
        </div>
    ));



    // console.log(ingObject)
    //*** RETURN */

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <span role='img' aria-label="meal"> 🍓</span>
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleIngredients} className='show' aria-label="settings">
                        <OpenInBrowserIcon style={{ color: red[500], fontSize: 30 }} />
                    </IconButton>
                }
                title={meal.strMeal.substring(0, 10)}
                subheader={`Area: ${meal.strArea} `}
            />
            <CardMedia
                className={classes.media}
                image={meal.strMealThumb}
                title={meal.strCategory}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="span">
                    <a href={meal.strYoutube} target='blank'>Youtube</a>

                    <h3>{meal.strMeal}</h3>
                    <Typography paragraph>Instructions:</Typography>
                    {meal.strInstructions.substring(0, 33)}
                    ...
                </Typography>
            </CardContent>

            <CardContent className={expanded2 ? 'cardIngredients' : 'cardIngredients dnone'} >
                <Typography variant="body2" color="textSecondary" component="span">
                    <Typography paragraph>Instructions:</Typography>
                    <div className='cardIngredientsElements'>
                        {ingObject}

                    </div>
                    ...
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: red[500], fontSize: 30 }} />
                </IconButton>
                <IconButton aria-label="share">
                    {/* <ShareIcon /> */}
                </IconButton>

                {!expanded2 ?
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon className='cardExpandBtn' style={{ color: green[500], fontSize: 30 }} />
                    </IconButton>
                    : ''}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <Typography className='cardMealInstrucions' component='div'>

                        {meal.strInstructions}

                        {/* <a href="{meal.strYoutube}" target='blank'>YouTube</a> */}

                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}
