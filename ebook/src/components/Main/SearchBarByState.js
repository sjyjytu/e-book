import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {connect} from "react-redux";
import {Book} from "../../agent";
import {Radio} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
        display:'inline-block'

    },
    searchIcon: {
        marginLeft:theme.spacing.unit,
        //width: theme.spacing.unit * 2,
        height: '100%',
        position: 'absolute',
        //pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
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
        marginLeft: theme.spacing.unit*3,
    },
    radio:{
        display: 'inline-block',
        width: '10px',
    },
    clearBtn:{
        marginLeft:-8*theme.spacing.unit,
        //width: theme.spacing.unit * 2,
        height: '100%',
        position: 'absolute',
    }
});

class SearchBarByState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {key:''};
    }

    searchOnClick() {
        const key = this.state.key;

        this.props.setKey(key);
        if (key === ''||key===undefined) {
            alert('关键字不能为空哦~');
        } else {

        }
    }

    handleRadioChange(e) {
        this.props.switchBy();
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
                        <Typography variant="h6" color="inherit">
                            通过以下方式查找书:
                        </Typography>
                        <Radio
                            checked={this.props.by === 'ISBN'}
                            onChange={this.handleRadioChange}
                            value="ISBN"
                            name="radio-button"
                            aria-label="ISBN"
                            checkedIcon={"ISBN"}
                        />
                        <Radio
                            checked={this.props.by === 'bookname'}
                            onChange={this.handleRadioChange}
                            value="bookname"
                            name="radio-button"
                            aria-label="bookname"
                            checkedIcon={"书名"}
                        />
                        <div className={classes.search}>
                            <Button className={classes.searchIcon}
                                    onClick={() => this.searchOnClick()}>
                                <SearchIcon/>
                                Go
                            </Button>
                            <InputBase
                                placeholder={"输入关键字查找..."}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.key}
                                onChange={e => this.setState({key:e.target.value})}/>
                            <Button className={classes.clearBtn}
                                    onClick={()=>{this.props.clearAndReset();this.setState({key:''})}}
                            >
                                x
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBarByState));