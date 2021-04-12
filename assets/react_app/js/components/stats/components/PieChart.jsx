import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ApexCharts from 'apexcharts'

import ReactApexChart from 'react-apexcharts'

const PieChart = ({serie}) => { 
    const [state, setState] = useState({     
        series: [],
        options: {
              chart: {
                width: 500,
                type: 'pie',
              },
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
    })

    useEffect(() => {
        setState({...state, 
            series: serie.data, 
            options: {...state.options, labels: serie.labels}
        })
    }, [serie])

    return (
        <div className="chart">
            <h3>Répartition selon mes relations</h3>
            <ReactApexChart 
                options={state.options} 
                series={state.series} 
                type="pie" 
                width={600}
                className="relation-distribution"
            />
        </div>
    )    
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(PieChart)