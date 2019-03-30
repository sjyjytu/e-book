import React from "react";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {Button,Toolbar} from "@material-ui/core";
import {connect} from "react-redux";

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    setPage(page) {
        this.setState({
            page
        },()=>{this.props.onChange(page)})
    }

    render() {
        const {total,eachPageNum,isManager} = this.props;
        const {page} = this.state;
        const allPage = Math.ceil(total / eachPageNum) || 1;
        return (
            //allPage > 1 &&
            <Toolbar>

                <div>
                    {
                        `${(page - 1) * eachPageNum + 1}-${page * eachPageNum<total?page * eachPageNum:total} of ${allPage} Pages`
                    }
                </div>
                <div style={{marginLeft: '200px'}}>
                    {
                        <Button primary key="prev" label="上一页" disabled={page <= 1}
                                onClick={() => this.setPage(page - 1)}>
                            <ChevronLeft/>
                            上一页
                        </Button>
                    }
                    {
                        `当前页：${page}`
                    }
                    {
                        <Button primary key="next" label="下一页" disabled={page === allPage}
                                onClick={() => this.setPage(page + 1)} labelPosition="before">
                            下一页
                            <ChevronRight/>
                        </Button>
                    }
                </div>
                {isManager?
                    <div style={{marginLeft:'400px'}}>
                        <Button size="large" variant="outlined" href="#/add-new-book">
                            新增图书
                        </Button>
                    </div>
                :null}
            </Toolbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        isManager: state.Login.isManager,
    }
}

export default connect(mapStateToProps)(Pagination);