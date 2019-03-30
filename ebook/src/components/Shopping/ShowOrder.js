import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Header from '../Header';
import {connect} from "react-redux";
import {Order} from "../../agent";


const styles = theme => ({
    superRoot:{
        minWidth: '650px',
    },
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
    },
    price:{

    }
});



class ShowOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {orders: []};
    }

    componentDidMount() {
        Order.showOrder(this.props._id).then(res=> this.setState({orders:res.orders})).catch(err=>alert(err));
    }

    render() {
        const {classes} = this.props;
        const {orders} = this.state;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <div className={classes.root}>
                    {orders.map(order =>
                        <React.Fragment key={order.orderId}>
                            <Toolbar>
                                <Avatar className={classes.avatar} alt="Order" children="订单"/>
                                <Typography variant="h6">{order.orderId}</Typography>
                            </Toolbar>
                            <Typography className={classes.title}>{order.createTime}</Typography>
                            <div className={classes.summary}>
                                {
                                    order.books.map(book=> {
                                        return <Typography>
                                                {book.bookname + " * " + book.num}
                                        </Typography>;
                                    })
                                }
                            </div>
                            <Typography className={classes.price}>{"总价：" + order.totalPrice}</Typography>
                            <Divider className={classes.divider}/>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

ShowOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {_id: state.Login._id/*, cart:BookAndNum.books*/};
}

export default connect(mapStateToProps)(withStyles(styles)(ShowOrder));