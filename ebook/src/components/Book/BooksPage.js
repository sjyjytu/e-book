import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import ChoosePage from '../Main/ChoosePage';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';
import Catalog from '../Main/Catalog';
import Pagination from './Pagination';
import {connect} from "react-redux";
import {Book, Manage} from "../../agent";
import {Button} from "@material-ui/core";

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
    bookNPP = 3;  //book number per page
    constructor(props) {
        super(props);
        this.state = {curPage:1,total:0,update:this.props.update};
        this.bookPageOnChange = this.bookPageOnChange.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount() {
        Book.showBooks(this.state.curPage,this.bookNPP).then(res=>{this.setState({total:res.count});
        return this.props.storePageBooks(res)}).catch(err=>alert(err));
    }

    bookPageOnChange(page){
        this.setState({curPage: page});
        Book.showBooks(page,this.bookNPP).then(res=>{this.setState({totalPage:Math.ceil(res.count/this.bookNPP)||1});
            return this.props.storePageBooks(res)}).catch(err=>alert(err));
    }

    deleteBook(_id, bookname, ISBN) {
        Manage.deleteABook(_id, bookname, ISBN).then(this, this.props.deleteBook(ISBN)).catch(err => alert(err));
        this.forceUpdate();
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
                            {
                                books!==undefined?
                                    <div className={classes.root}>
                                        {
                                            books.map((book) => (
                                                <div className={classes.bookCard}>
                                                    <BookCard book={book} deleteBook={this.deleteBook}/>
                                                </div>
                                            ))
                                        }
                                    </div>:
                                    <p className={classes.root}>没有符合条件的书籍</p>
                            }

                        </Grid>
                    </Grid>
                    <Button onClick={()=>this.forceUpdate()}>update</Button>
                    <Pagination total={this.state.total} eachPageNum = {this.bookNPP} onChange={page => this.bookPageOnChange(page)}/>
                </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        books: state.BookDetail.books,
        update: state.BookDetail.update,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storePageBooks: res => dispatch({type:"SHOW_BOOK",result:res}),
        deleteBook: ISBN=>dispatch({type:"DELETE_BOOK",ISBN:ISBN}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BooksPage));