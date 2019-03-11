import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 170,
    },
    media: {
        height: 200,
    },
    author:{
        color:'gray'
    }
};

class BookCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes,imgSrc } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={imgSrc}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            流他妈浪地球
                        </Typography>
                        <Typography component="p" className={classes.author}>
                            作者：客天涯
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        价格
                    </Button>
                    <Button size="small" color="primary" href="#/book/123">
                        详情
                    </Button>
                </CardActions>
            </Card>
        );
    }


}


export default withStyles(styles)(BookCard);

