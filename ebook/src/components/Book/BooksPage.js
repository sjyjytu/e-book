import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import ChoosePage from '../Main/ChoosePage';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';
import Catalog from '../Main/Catalog';

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
    render() {
        const {classes} = this.props;
        const array =  new Array(100);
        for (var i = 0; i < 100; i++) {
            array[i] = i;
        }
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
                                array.map(()=>(
                                    <div className={classes.bookCard}>
                                        <BookCard
                                            imgSrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551802325651&di=d9148ae42e0be9d8d7355c94382a1724&imgtype=0&src=http%3A%2F%2Fpic43.photophoto.cn%2F20170608%2F0009021150907030_b.jpg"/>
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

export default withStyles(styles)(BooksPage);