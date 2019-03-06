import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',

        [theme.breakpoints.up('md')]: {
        width: 200,
    },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',

    },
    searchIcon: {
        marginLeft:theme.spacing.unit,
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.55),
        },
        marginRight: theme.spacing.unit * 2,
        float: 'right',
        width: '400px',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        },
    },
    toolbar: {
        marginLeft: -theme.spacing.unit,
        marginRight: -theme.spacing.unit,
        height: '100px',
        paddingTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.elight,
    },
    title: {
        overflow: 'visible',
        marginLeft: theme.spacing.unit,
    }
});

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.toolbar}>
                <Grid container spacing={24} alignItems="center">
                    <Grid item xs={6}>
                        <Typography className={classes.title} variant="h2" color="secondary" noWrap>
                            e-book
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="搜索书名..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);