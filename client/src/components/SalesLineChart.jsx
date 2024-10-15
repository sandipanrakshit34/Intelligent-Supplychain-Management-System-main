import { ResponsiveLine } from '@nivo/line';

const SalesLineChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: '0',
      max: 'auto',
      stacked: false, // Set stacked to false to avoid stacking of lines
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 10,
      tickPadding: 15,
      tickRotation: 0,
      legend: 'Month',
      legendOffset: 36,
      legendPosition: 'middle',
      tickLabel: {
        fontSize: 12,
        fill: '#fff', // White color for better contrast on dark backgrounds
      },
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 10,
      tickPadding: 15,
      tickRotation: 0,
      legend: 'Sales',
      legendOffset: -40,
      legendPosition: 'middle',
      tickLabel: {
        fontSize: 12,
        fill: '#fff', // White color for better contrast on dark backgrounds
      },
    }}
    colors={['#ff7f0e', '#1f77b4', '#2ca02c', '#d62728']} // Bright colors for lines
    pointSize={10}
    pointColor={{ theme: 'background' }} // Ensure point colors contrast with the dark background
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    gridLineColor="#555" // Light grey for grid lines on dark background
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default SalesLineChart;
