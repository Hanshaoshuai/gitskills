import React,{Component} from "react";
import { Table } from 'antd';
import reqwest from 'reqwest';
import 'antd/lib/table/style/css';
import {Link} from 'dva/router'
const columns = [{
  title: 'ID',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '用户账号',
  dataIndex: 'gender',
  width: '15%',
}, {
  title: '用户姓名',
  dataIndex: 'email',
  width: '15%',
}, { title: '操作', dataIndex: '', key: 'x', render: () =>(<span><Link to='bianji'>编辑</Link> <Link to='chongzhi'>重置用户密码</Link> <a href="#">删除</a></span>)}];
class Tuisong extends React.Component {
 state = {
    data: [],
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
       <div>
       {this.props.children}
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>用户管理</div>
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
      </div>
    );
  }
}
export default Tuisong;
