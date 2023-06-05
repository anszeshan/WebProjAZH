import React from 'react';
import {Table, Avatar} from 'antd';
import { PageHeader } from '../Generic/PageHeader';


const TableComp = () => {
  const columns = [
    {
      title: `Image`,
      dataIndex: 'image',
      render: text => <Avatar shape="square" src={text} />,
    },
    {
      title: `Author`,
      dataIndex: 'author',
    },
    {
      title: `Categories`,
      dataIndex: 'categories',
    },
    
    {
      title: `Comments`,
      dataIndex: 'comments',
    },
 
  ]
  return (
    <>
    <PageHeader heading="Users" subHeading="All Users" btnText="Add User"/>
    <div style={{paddingRight:'2rem'}}>
    <Table
    pagination={{
      showTotal: total => `Total ${total} Items`,
    }}
    columns={columns}
    rowKey={record => record.id}
    />
    </div>
    </>
  );
}

export default TableComp;
