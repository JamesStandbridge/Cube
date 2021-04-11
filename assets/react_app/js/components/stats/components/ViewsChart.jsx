import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ApexCharts from 'apexcharts'
import styled from 'styled-components'

import ReactApexChart from 'react-apexcharts'

const ViewsChart = ({AuthHandler, dateFrom, dateTo, resourcesSerie}) => {
    const [state, setState] = useState({   
        series: [{
            name: 'Nombre de vues',
            type: 'column',
            data: [320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        }, {
            name: 'Nombre de ressource postées',
            type: 'line',
            data: [10, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            stroke: {
             width: [0, 4]
            },
            title: {
                text: 'Traffic sur vos ressources'
            },
            colors:['#577590', '#fb4a49'], 
            markers: {
                colors: ['#577590', '#fb4a49']
            },
            dataLabels: {
                style: {
                    colors:['#577590', '#fb4a49']
                },
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'July 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020', 'Nov 2020', 'Dec 2020'],
            xaxis: {
                type: 'string'
            },
            yaxis: [{
                title: {
                    text: 'Nombre de vues',
                },
            }, {
                opposite: true,
                title: {
                    text: 'Nombre de ressource postées'
                }
            }]
        },
    })
	
    useEffect(() => {
        const rSerie = []
        const labels = DateFormatter(resourcesSerie)

        resourcesSerie.map(item => {
            rSerie.push(item.value)
        })



        const newSeries = [{
            name: 'Nombre de vues',
            type: 'column',
            data: [320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257]
        }, {
            name: 'Nombre de ressource postées',
            type: 'line',
            data: rSerie
        }]

        setState({...state, series: newSeries, options:  {...state.options, labels: labels}})
    }, [resourcesSerie])

	const handleChange = (e) => {
		console.log(e);
	}

	return (     
		<Container>
			<div id="chart">
				<ReactApexChart options={state.options} series={state.series} type="line" height={350} />
			</div>
		</Container>
	)
    
}


const DateFormatter = (serie) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const labels = serie.map(item => {
        const date = item.date.split("-")
        const month = months[parseInt(date[0] - 1)]
        return `${month} ${date[1]}`
    })
    return labels
}


function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(ViewsChart)

const Container = styled.div`
	background-color: white;
	margin: 20px 0px;
	padding: 40px 50px;
	box-shadow: 0 0 6px 2px rgba(0,0,0,.1);
	 border-bottom: 2px solid transparent;
`
    