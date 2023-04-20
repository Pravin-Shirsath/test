import ChartConfig from 'Constants/chart-config';
// Space Used
export const spaceUsed = {
    chartData: {
        labels: ['Space Used', 'Space Left'],
        datasets: [{
            data: [275, 100],
            backgroundColor: [
                ChartConfig.color.primary,
                ChartConfig.color.info
            ],
            hoverBackgroundColor: [
                ChartConfig.color.primary,
                ChartConfig.color.info
            ]
        }]
    },
 }