import { Card } from 'antd'
import React from 'react'
import { PageHeader } from './Generic/PageHeader'
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

const Insights = () => {
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      
  return (
    <div>
      <PageHeader
        heading='Insights'
        subHeading='On this page you can view some useful insights'
      />
      <div style={{ display: 'flex', marginBottom: '2rem' }}>
        <div>
          <Card style={{ paddingInline: '4rem', paddingBlock: '2rem' }}>
            <h4>Hires</h4>
            <h5>3</h5>
          </Card>
        </div>
        <div className='mx-5'>
          <Card style={{ paddingInline: '4rem', paddingBlock: '2rem' }}>
            <h4>Job Postings</h4>
            <h5>10</h5>
          </Card>
        </div>
        <div>
          <Card style={{ paddingInline: '4rem', paddingBlock: '2rem' }}>
            <h4>Views</h4>
            <h5>12</h5>
          </Card>
        </div>
      </div>

      <div>
        <LineChart width={1400} height={600} data={data}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
          <Line type='monotone' dataKey='uv' stroke='#8884d8' />
          <Line type='monotone' dataKey='pv' stroke='#82ca9d' />
        </LineChart>
      </div>
    </div>
  )
}

export default Insights
