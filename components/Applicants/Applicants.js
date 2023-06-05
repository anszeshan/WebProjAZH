import React from 'react';
import { Table } from 'antd';
import { PageHeader } from '../Generic/PageHeader';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useGetAllApplicationsByEmpQuery, useDeleteApplicantMutation } from '../../services/nodeAPI';

export const Applicants = () => {
    const navigate = useNavigate();
    const {data: apps, isLoading} = useGetAllApplicationsByEmpQuery();
    const [deleteApplicant] = useDeleteApplicantMutation()

    const columns = [
        {
          title: 'Applicant Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => text,
        },
        {
          title: 'Applicant Email',
          dataIndex: 'email',
          key: 'email',
        }, {
          title: 'Applied on',
          dataIndex: 'appliedOn',
          key: 'appliedOn',
        },
        {
          title: 'Job Title',
          dataIndex: 'jobTitle',
          key: 'jobTitle',
        },{
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) =>  {
            return (
              <div>
                  <span onClick={()=>navigate(`/dashboard/applicants/view/${record.id}`)}><VisibilityIcon/></span>&nbsp;
                  
                  <span onClick={async()=>{await deleteApplicant(record.id)}}><CloseIcon/></span>
              </div>
            )
          }
        },
      ];
      let data =[]
      const moment = require('moment');
      if(apps && !isLoading)
      {
         data = apps.data.map((app)=>{
          const currentDate = new Date().toISOString().split('T')[0];
// console.log(currentDate);
            return {
              key: '1',
              id: app._id,
              name: app.applicant.name,
              email: app.applicant.email,
              appliedOn: currentDate,
              jobTitle: app.job.title,
              country: app.applicant.country,
              status: 'Not Hired', 
          
            }
          })
      }
    return (
        <div>
        <PageHeader heading="Applicants" subHeading="You can find all applicants of job here"/>
        <div>
        {apps && !isLoading &&
        <Table columns={columns} dataSource={data} />
        }
        </div>
        </div>
    );
}

