const data = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];

const xScale = d3
  .scaleBand()
  .domain(data.map((dat) => dat.region))
  .rangeRound([0, 250])
  .padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

const conatiner = d3.select('svg').classed('container', true);

const bars = conatiner
  .selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  .attr('x', (data) => xScale(data.region))
  .attr('y', (data) => yScale(data.value));

setTimeout(() => {
  bars.data(data.slice(0, 2)).exit().remove();
}, 2000);

const countriesData = {
  items: ['China', 'India', 'USA'],
  addItem(country) {
    this.items.push(country);
  },
  removeItem(index) {
    this.items.splice(index, 1);
  },
  updateItem(index, newCountry) {
    this.items[index] = newCountry;
  },
};

d3.select('ul')
  .selectAll('li')
  .data(countriesData.items, (data) => data)
  .enter()
  .append('li')
  .text((data) => data);

setTimeout(() => {
  countriesData.addItem('Germany');
  d3.select('ul')
    .selectAll('li')
    .data(countriesData.items, (data) => data)
    .enter()
    .append('li')
    .text((data) => data)
    .classed('added', true);
}, 2000);

setTimeout(() => {
  countriesData.removeItem(0);
  d3.select('ul')
    .selectAll('li')
    .data(countriesData.items, (data) => data)
    .exit()
    .classed('redundant', true);
}, 4000);

setTimeout(() => {
  countriesData.updateItem(1, 'Russia');
  d3.select('ul')
    .selectAll('li')
    .data(countriesData.items, (data) => data)
    .exit()
    .classed('updated', true);
}, 6000);

const chartData = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];

const MARGINS = { top: 20, bottom: 10 };
const Chart_Width = 600;
const Chart_Height = 400 - MARGINS.top - MARGINS.bottom;

const x = d3.scaleBand().rangeRound([0, Chart_Width]).padding(0.1);
const y = d3.scaleLinear().range([Chart_Height, 0]);

x.domain(chartData.map((data) => data.region));
y.domain([0, d3.max(chartData, (data) => data.value) + 3]);

const chartContainer = d3
  .select('#chart svg')
  .attr('width', Chart_Width)
  .attr('height', Chart_Height + MARGINS.top + MARGINS.bottom);

const chart = chartContainer.append('g');

chart
  .append('g')
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .attr('transform', `translate(0, ${Chart_Height})`)
  .attr('color', '#4f009e');

chart
  .selectAll('.bar1')
  .data(chartData)
  .enter()
  .append('rect')
  .classed('bar1', true)
  .attr('width', x.bandwidth())
  .attr('height', (data) => Chart_Height - y(data.value))
  .attr('x', (data) => x(data.region))
  .attr('y', (data) => y(data.value));

chart
  .selectAll('.label')
  .data(chartData)
  .enter()
  .append('text')
  .text((data) => data.value)
  .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
  .attr('y', (data) => y(data.value) - 20)
  .attr('text-anchor', 'middle')
  .classed('label', true);

const listItems = d3
  .select('#data')
  .select('ul')
  .selectAll('li')
  .data(chartData)
  .enter()
  .append('li');

listItems.append('span').text((data) => data.region);

listItems
  .append('input')
  .attr('type', 'checkbox')
  .attr('checked', true)
  .on('change', (data) => {
    console.log(data);
  });
