import React from 'react';
import Header from '../Header';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '../../theme';
import {connect} from "react-redux";
import request from 'superagent';
import {Manage} from "../../agent";
import IconButton from "@material-ui/core/IconButton";


const styles = theme => ({
    supermain:{
        minWidth: '450px',
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper:{
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submitButton:{
        float:'right',
    },
    imgButton:{
        fullWidth: 'true',
        backgroundColor: '#fff',
        outline: 'none',
        borderWidth: '0px',
        borderRadius: '3px',


    },
    input:{
        display:'none'
    },
    img: {
        width: '120px',
        height: '170px',
    },
    bookname:{
        display: 'block',
    },
    author:{

    },
    head:{
        float: 'left',
        height: '170px',
    },
    cover:{
        alignItems: 'center',
        justifyContent: 'center',
        float: 'right',
        height: '170px',
        display: 'flex',
        width: '120px',
        border: '1px dashed blue',
    },
});

//连接cloudinary的东西
const CLOUDINARY_UPLOAD_PRESET = 'cvtoheob';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbqbt0cli/upload';


class AddNewBook extends React.Component{
    constructor(props) {
        super(props);
        this.state = {bookname: '', summary: '', uploadImg: null, uploadImgUrl: '', price: 0, author: '', stockNum: 0};
        this.handleInputChange = field=> e => {
            const state = this.state;
            const newState = Object.assign({}, state, {[field]: e.target.value});
            this.setState(newState);
        };
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadImgUrl: response.body.secure_url
                });
                console.log(response.body.secure_url);
                //this.forceUpdate();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.supermain}>
                    <Header/>
                    <main className={this.props.classes.main}>
                        <Paper className={this.props.classes.paper}>
                            <form onSubmit={
                                e => {
                                    e.preventDefault();
                                    this.props.addNewBook(
                                        {
                                            "bookname": this.state.bookname,
                                            "stockNum": this.state.stockNum,
                                            "summary": this.state.summary,
                                            "pictureUrl": this.state.uploadImgUrl,
                                            "author": this.state.author,
                                            "price": this.state.price
                                        }
                                    )
                                }
                            }>
                                <div className={this.props.classes.head}>
                                    <FormControl margin="normal" required className={this.props.classes.bookname}>
                                        <InputLabel htmlFor="bookname">Book Name</InputLabel>
                                        <Input
                                            id="bookname"
                                            name="bookname"
                                            value={this.state.bookname}
                                            onChange={this.handleInputChange('bookname')}
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required className={this.props.classes.author}>
                                        <InputLabel htmlFor="author">Author</InputLabel>
                                        <Input
                                            id="author"
                                            name="author"
                                            value={this.state.author}
                                            onChange={this.handleInputChange('author')}
                                            autoFocus
                                        />
                                    </FormControl>
                                </div>
                                <div className={this.props.classes.cover}>
                                    <input accept=".jpg,.jpeg,.png " className={this.props.classes.input}
                                           id="icon-button-file" type="file"
                                           ref={ref => this.image = ref} onChange={event => {
                                        if (event.target.files.length !== 0) {
                                            this.onImageDrop(event.target.files);
                                        }
                                    }
                                    }/>
                                    <button className={this.props.classes.imgButton} onClick={() => this.image.click()}>
                                        {this.state.uploadImgUrl === '' ?
                                            <p>pick cover</p> :
                                            <img className={this.props.classes.img} src={this.state.uploadImgUrl}/>}
                                    </button>
                                </div>
                                <TextField margin="normal" required fullWidth multiline
                                           label="summary" rows={6} variant='outlined'
                                           id="summary" placeholder="summary of the book..."
                                           value={this.state.summary}
                                           onChange={this.handleInputChange('summary')}
                                />
                                <Button type="submit" variant="contained" color="primary"
                                        className={this.props.classes.submitButton}>
                                    提交
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}
function mapStateToProps(state) {
    return {
        redirectTo: state.Redirect.redirectTo,
        //authToken: state.Login.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewBook: (book) => {
            Manage.addABook(book)
                .then(res=>dispatch({type:'ADD_BOOK',book:book}))
                .catch(()=>alert("add book failed"));
        },
        onRedirect: () => dispatch({type: 'REDIRECTED'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddNewBook));