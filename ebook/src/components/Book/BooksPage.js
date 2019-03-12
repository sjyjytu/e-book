import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import ChoosePage from '../Main/ChoosePage';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';
import Catalog from '../Main/Catalog';
import {connect} from "react-redux";
import {Book} from "../../agent";

const styles = theme => ({
    superRoot:{
      minWidth:'900px'
    },
    root: {
        position: 'relative',
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        backgroundColor: theme.palette.common.paper,
    },
    bookCard:{
        marginLeft: theme.spacing.unit * 4,
        position: 'relative',
        display: 'inline-block',
        width:'200px',
        height: '250px',
        marginBottom: theme.spacing.unit * 15,
    },

});

class BooksPage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Book.showBooks().then(res=>this.props.storeAllBooks(res)).catch(err=>alert(err.message));
    }

    render() {
        const {classes,books} = this.props;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <SearchBar/>
                <ChoosePage/>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <Catalog/>
                    </Grid>
                    <Grid item xs={9} wrap="wrap">
                        <div className={classes.root}>
                            {
                                books.map((book)=>(
                                    <div className={classes.bookCard}>
                                        <BookCard book={book}/>
                                    </div>
                                ))
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.BookDetail.books,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeAllBooks: res => dispatch({type:"SHOW_BOOK",result:res})
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BooksPage));