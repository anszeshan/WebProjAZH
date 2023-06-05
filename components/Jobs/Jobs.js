import React, { useEffect, useState } from 'react';
import { Table , Modal} from 'antd';
import { PageHeader } from '../Generic/PageHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useDeleteJobMutation, useGetAllJobsEmpQuery, useGetAllJobsQuery } from '../../services/nodeAPI';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';

export const Jobs = () => {
  const navigate= useNavigate()
  const [ isModalOpen, setIsModalOpen ]=useState( false );

  const { user }=useSelector( state => state.user );
  const { data: jobsData, error, isLoading }=useGetAllJobsEmpQuery( user.id );
  const [ jobs, setJobs ]=useState( null );
  const [ jobID, setJobID ]=useState( null );
  const [ deleteJob ]=useDeleteJobMutation();
  useEffect( () => {
    if ( !isLoading&&jobsData ) {
      let arr=[];
      console.log( 'DATA:', jobsData );
      jobsData.data.jobs.forEach( ( el, i ) => {
        let obj={ ...el };
        obj.no=i;
        obj.key=i;
        obj.domain=el.oppType;
        obj.date=el.date; //replace
        obj.status="open"; //replace
        arr.push( obj );
      } )
      console.log( 'ARR', arr )
      setJobs( arr );
    }
  }, [ isLoading, jobsData ] )

  const showModal=( id ) => {
    setIsModalOpen( true );
    console.log( 'ID', id )
    setJobID( id );
  };
  const handleOk=async () => {
    setIsModalOpen( false );
    await deleteJob( jobID );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit=()=>{
    navigate('/dashboard/jobs/edit')
  }

    const columns = [
      {
        title:'No.',
        dataIndex:'no'
      },
        {
          title: 'Title',
          dataIndex: 'title',
       },
        {
          title: 'Country',
          dataIndex: 'country',
         
        },
        {
          title: 'Posted on',
          dataIndex: 'date',
        }, 
        {
          title: 'Domain',
          dataIndex: 'domain',
        }, 
        {
          title: 'Status',
          dataIndex: 'status',
        },
        {
        
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <div>
                <span onClick={() => { navigate( `/dashboard/jobs/view/${record.id}` ) }}>
              <VisibilityIcon/>
                </span>
                &nbsp;
                <span onClick={() => navigate( `/dashboard/jobs/edit/${record.id}` )
                }>
                <EditIcon/>
                </span>
                &nbsp;
                <span>
                  <DeleteIcon onClick={() => showModal( record.id )} />
                </span>

                
              </div>
            ),
          },
      ];

  const data2=[
        {
          key: '1',
          no:1,
          title: 'John Brown',
          country: 32,
          postedon: 'New York No. 1 Lake Park',
          status:'open',
          domain:'web app'
        },

      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }

  if ( isLoading&&!jobsData )
    return <Spinner />
  return (
        <div>
             <Modal title="Delete Job" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
            <PageHeader heading="Jobs" subHeading="All Jobs" btnText="Add Job" toLink='/dashboard/jobs/add'/>
      <Table columns={columns} dataSource={jobs} onChange={onChange} />
        </div>
    );
}

