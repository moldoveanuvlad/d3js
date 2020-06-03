  //initial setup
  const margin = 80
  const width = 800
  const height = 600
  const chartWidth = width - 2 * margin
  const chartHeight = height - 2 * margin

  const svgContainer = d3.select('#container')
    .append('svg')
    .attr('width',width)
    .attr('height', height)
    .style('background', '#000000')
    .attr('viewBox', '0 0 800 600')

  const chart = svgContainer.append('g')
    .attr('transform', `translate(${margin}, ${margin})`)
    .attr('class', 'bar-chart')

  const xScale = d3.scaleBand()
    .range([0, chartWidth])
    .domain(sampledata.map((s) => s.language))
    .padding(0.4)
  
  const yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(sampledata.map((s) => s.value)) + 10])

  // vertical grid lines
  const makeXLines = () => d3.axisBottom()
    .scale(xScale)

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  chart.append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  // vertical grid lines
  chart.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(makeXLines()
      .tickSize(-chartHeight)
      .tickFormat('')
    )

  chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-chartWidth)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(sampledata)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', '#86bc25')
    .attr('x', (g) => xScale(g.language))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => chartHeight - yScale(g.value))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (d, i) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('fill', '#d0d0ce')
    })
    .on('mouseleave', function (d, i) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('fill', '#86bc25')
    })
    .on('click', (d, i) => {
      alert(`Bar number ${i+1} has a value of ${d.value}`)
    })

  barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 20)
    .attr('text-anchor', 'middle')
    .text((a) => a.value)
  
    svgContainer.append('text')
    .attr('class', 'title')
    .attr('x', chartWidth / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('JavaScript Frameworks for Developers in 2019')

