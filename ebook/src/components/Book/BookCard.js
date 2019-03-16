import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {Login} from '../../agent';
import {connect} from "react-redux";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

const styles = {
    card: {
        maxWidth: 170,
    },
    media: {
        height: 250,
    },
    author:{
        color:'gray'
    },
    deleteButton:{
        position:'absolute',
        float:'right',
        marginLeft: '120',
    }
};

class BookCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes,book, isManager } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={book.pictureUrl}
                        title="Contemplative Reptile"
                    />
                    {
                        isManager?
                            <IconButton className={classes.deleteButton}>
                                <Delete/>
                            </IconButton>
                            :null
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            {book.bookname}
                        </Typography>
                        <Typography component="p" className={classes.author}>
                            {book.author}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {book.price}
                    </Button>
                    {isManager?
                        <Link to={'book/' + book.ISBN}>
                            详情
                        </Link>:
                        <Link to={'update/' + book.ISBN}>
                            更改
                        </Link>
                    }

                </CardActions>
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
        isManager: state.Login.isManager
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BookCard));

