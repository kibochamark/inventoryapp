"use client"
import React from 'react'
import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const HighChart = ({props}:{props:any}) => {
  return (
    <div className='w-full overflow-hidden'>
        <HighchartsReact highcharts={Highcharts} options={props}/>
    </div>
  )
}

export default HighChart