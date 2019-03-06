import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";
import {connect} from "react-redux";
import {Article} from "../../agent";

const styles = theme => ({
    root:{
        marginTop:theme.spacing.unit * 5,
        paddingLeft: '20%',
        paddingRight: '10%',
    },
    paper:{
        paddingLeft:'40%',
        marginTop: theme.spacing.unit * 5,
    },
    date:{
        marginTop: theme.spacing.unit * 2,
    },
    avatar:{
        marginRight: theme.spacing.unit * 2,
        marginLeft: -theme.spacing.unit,
    },
    title:{
        color:theme.palette.primary.dark,
        fontSize: theme.spacing.unit * 3,
    },
    summary:{
        color: 'gray',
        fontSize: theme.spacing.unit,
    },
    link:{
        color: 'purple',
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 5,
    },
    deleteButton: {
        marginLeft: '70%',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});



function Content(props) {
    const {classes, Articles, Tag, Login, deleteButtonClick} = props;
    const reverseArticles = Articles.articles.slice(0).reverse();
    return (
        <div className={classes.root}>
            {/*Articles.articles*/reverseArticles.map(article => (article.tag === Tag || Tag === '所有' ?
                    <React.Fragment key={article._id}>
                        <Toolbar>
                            <Avatar className={classes.avatar} alt="Person" children={article.author}/>
                            <Typography variant="h6">{article.creator}</Typography>
                        </Toolbar>
                        <Typography className={classes.title}>{article.title}</Typography>
                        <Typography className={classes.summary}>{article.content.substring(0, 20) + '...'}</Typography>
                        <Link to={'article/' + article._id} className={classes.link}>Read more...</Link>
                        {
                            Login.userId === article.creator ?
                                <Button variant="contained" color="secondary" className={classes.deleteButton}
                                        onClick={() => deleteButtonClick(article._id, Login.token)}>
                                    Delete
                                    <DeleteIcon className={classes.rightIcon}/>
                                </Button>
                                : null
                        }
                        <Divider className={classes.divider}/>
                    </React.Fragment>
                    : null
            ))}
        </div>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {Tag, Login, Articles} = state;
    return {Tag, Login, Articles};
}

function mapDispatchToProps(dispatch) {
    return {
        deleteButtonClick: (articleId, auth) => Article.deleteArticle(articleId, auth).then(dispatch({
            type: 'DELETE',
            articleId: articleId
        })).catch(() => alert('delete article failed, please try again')),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Content));