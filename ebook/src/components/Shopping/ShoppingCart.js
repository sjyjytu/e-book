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
import {Book} from "../../agent";
import {connect} from "react-redux";


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



class Content extends React.Component{
    constructor(props) {
        super(props);
        //this.state = {books: []}
    }
    componentDidMount() {
        Book.showCart(this.props._id).then(res=>{
            return this.props.storeCart(res)}).catch(err=>alert(err.message));
    }
    render() {
        const {classes, cart, removeButtonClick} = this.props;
        return (
            <div className={classes.root}>
                {cart.map(book =>
                        <React.Fragment key={book.ISBN}>
                            <Toolbar>
                                <Avatar className={classes.avatar} alt="Book" children="书"/>
                                <Typography variant="h6">{book.ISBN}</Typography>
                            </Toolbar>
                            <Typography className={classes.title}>{book.bookname}</Typography>
                            <Typography className={classes.summary}>{"数量：" + book.num}</Typography>
                            <Link to={'book/' + book.ISBN} className={classes.link}>详情</Link>
                            <Button variant="contained" color="secondary" className={classes.deleteButton}
                                    onClick={() => removeButtonClick(this.props._id, book.bookname, book.ISBN)}>
                                Delete
                                <DeleteIcon className={classes.rightIcon}/>
                            </Button>
                            <Divider className={classes.divider}/>
                        </React.Fragment>
                )}
            </div>
        );
    }


    //const reverseArticles = Articles.articles.slice(0).reverse();

}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {Login, BookAndNum} = state;
    return {_id: Login._id,cart:BookAndNum.books};
}

function mapDispatchToProps(dispatch) {
    return {
        removeButtonClick: (_id, bookname, ISBN) => Book.removeFromCart(_id, bookname, ISBN).then(dispatch({
            type: 'DELETE',
            ISBN: ISBN
        })).catch(() => alert('delete article failed, please try again')),
        storeCart: res=> dispatch({type:"SHOW_CART",result:res})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Content));
