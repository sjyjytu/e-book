import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
    superRoot: {
        minWidth: '800px',
    },
    root: {
        position: 'relative',
        paddingTop: theme.spacing.unit * 3,
        paddingLeft: '8%',
        paddingRight: '3%',
        height: '350px',
        backgroundColor: theme.palette.common.paper,
    },
    left: {
        height: '250px',
        padding: theme.spacing.unit,
        textAlign: 'center',
        position: 'absolute',
        width: '18%',
        backgroundColor: '#ccc'
    },
    middle: {
        height: '200px',
        textAlign: 'left',
        marginLeft: '21%',
        width: '49%',
        position: 'absolute',
        whiteSpace: 'pre',
    },
    right: {
        height: '200px',
        border: '1px dashed #fab',
        lineHeight: '40px',
        //backgroundColor: 'purple',
        width: '15%',
        position: 'absolute',
        marginLeft: '75%',
        textAlign: 'center',
        fontSize: '25px',
        color: '#2aa',
        padding: '10px',
    },
    price: {
        backgroundColor: '#689',
        color: '#922',
        width: '90%',
        fontSize: '28px',
        margin: '10px 0',
        padding: '30px'
    },
    summary: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        height: 'auto',
        lineHeight: '20px',

    },
    summarySpan: {
        width: '200px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        overflow: 'hidden',
    },
    inputNum: {
        width: '40px',
        height: '30px',
    },
    addBtn: {
        backgroundColor: '#f88',
        marginLeft: theme.spacing.unit,
        fontSize: '18px',
        color: 'white',
    },
    buyBtn: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: '#fee',
        fontSize: '18px',
        color: '#f48',
        fontWeight: 'normal'
    },
    body: {
        position: "relative",
        marginTop: '10px',
        backgroundColor: '#d39',
        marginLeft: '50px',
    },
});

class BooksPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <SearchBar/>
                <div className={classes.root}>
                    <div className={classes.left}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551802325651&
                        di=d9148ae42e0be9d8d7355c94382a1724&imgtype=0&src=http%3A%2F%2Fpic43.photophoto.cn%2F20170608%2F0009021150907030_b.jpg"
                        width="100%" height="100%"/>
                    </div>
                    <div className={classes.middle}>
                        <Typography variant="h4">流他妈浪地球</Typography>
                        <Divider/>
                        <Typography variant="body1" color="inherit">
                            作者：客天涯
                            {"       "}
                            评论数：5201314
                        </Typography>
                        <div className={classes.price}>
                                ￥ 13880.00
                        </div>
                        <div className={classes.summary}>
                            <span className={classes.summarySpan}>
                                摘要：《流浪地球》根据刘慈欣同名小说改编，影片故事设定在2075年，讲述了太阳即将毁灭，已经不适合人类生存，而面对绝境，人类将开启“流浪地球”计划，试图带着地球一起逃离太阳系，寻找人类新家园的故事。
                            </span>
                        </div>
                        <input type="number" min="1" max="20" className={classes.inputNum} placeholder="0"/>
                        <Button className={classes.addBtn}>
                            加入购物车
                        </Button>
                        <Button className={classes.buyBtn}>
                            立即购买
                        </Button>
                    </div>
                    <div className={classes.right}>
                        广告位招租
                        客天涯是一个大帅b
                    </div>

                </div>
                <div className={classes.body}>
                    <BottomNavigation
                        value={this.state.value}
                        onChange={this.handleChange}
                        showLabels
                    >
                        <BottomNavigationAction label="商品评论" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="猜你喜欢" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="附近的人" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                    <Divider/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BooksPage);