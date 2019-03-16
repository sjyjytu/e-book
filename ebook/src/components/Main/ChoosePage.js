import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {connect} from "react-redux";

const styles = theme => (
    {
        button:{
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            margin: theme.spacing.unit,
            fontSize: '18px',
        },
        root:{
            flexGrow: 1,
        },
    }
);

class ChoosePage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} alignItems="center">
                    <Grid item xs={4}>
                        <Button className={classes.button} fullWidth={true} href='#/all-books'>所有图书</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.button} fullWidth={true}>用户管理</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.button} fullWidth={true} href="#/add-new-book">新增图书</Button>
                    </Grid>
                </Grid>
                <Divider/>
            </div>
        );
    }
}

export default withStyles(styles)(ChoosePage);