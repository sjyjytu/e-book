import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {User} from "../agent";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    submit:{
        marginTop: theme.spacing.unit * 2,
    }

});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:'',password:''};
        this.handleInputChange = field=> e => {
            const state = this.state;
            const newState = Object.assign({}, state, {[field]: e.target.value});
            this.setState(newState);
        };
    }

    render() {
        const {dialogState,handleClose,classes} = this.props;
        return (
            <React.Fragment>
                <Dialog
                    open={dialogState.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
                    <DialogContent>
                        <form onSubmit={event => {
                            event.preventDefault();
                            this.props.checkAccount(this.state.username, this.state.password);
                        }}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">UserName</InputLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange('username')}
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    autoComplete="current-password"
                                    onChange={this.handleInputChange('password')}
                                    type="password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

/*function mapStateToProps(state) {
    return {
        redirectTo: state.Redirect.redirectTo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAccount: (email, password) => {
            User.login(email, password).then(res=>dispatch({type: "LOGIN",result:res})).catch(err=>alert("username or password error"));
        },
        onRedirect: () => dispatch({type: 'REDIRECTED'})

    }
}*/

export default withStyles(styles)(Login);