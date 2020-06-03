/* 1. Let's create a simple data set */
const data = [
  {name:"a", value:100},
  {name:"b", value:200},
  {name:"c", value:300},
  {name:"d", value:400},
  {name:"e", value:500},
  {name:"f", value:600}
]

// 2. global svg settings
const width = 1200
const height = 400
const circleMargin = 150
const max = d3.max(data.map((d) => d.value))
/* 3. Let's create some scales:
  - a scale has a domain and a range
  [1, 500] ===> [1, 100]
  100 will correspond to 20, 250 to 50, 500 to 100 and so on
  - scales can also be applied to a color range
  */
const scale = d3.scaleLinear().domain([0, max]).range([15,50])
const colorScale = d3.scaleLinear().domain([0, max]).range(["#f7f7f7", "#86bc24"])

//4. Let's create a svg element with some attributes
const svg = d3.select("#data-container")
.append("svg")
.attr("width", width)
.attr("height", height)
//.attr("viewBox", "0 0 50 20")

/* viewbox attr acts like a scale for the svg width and height 
  You can redefine what the coordinates without units mean inside an <svg> element. You 		do so using the viewBox attribute. Here is an example:
  <svg width="500" height="200" viewBox="0 0 50 20" >
    <rect x="20" y="10" width="10" height="5" style="stroke: #000000; fill:none;"/>
  </svg>
  This example creates an <svg> element with a width of 500 pixels and a height of 200. The viewBox attribute of the 
  <svg> contains four coordinates. These coordinates define 	the view box of the <svg> element. The coordinates are x y 
  width height of the view box.
  In this case the view box starts at 0,0 and is 50 wide and 20 high. That means, 	that the 500 by 200 pixels <svg>
   element internally uses a coordinate system that goes from 0,0 to 50,20. In other words, every 1 unit in the 
   coordinates used in the shapes inside the <svg> corresponds to 500/50 = 10 pixels in the width, and 200/20 = 
   10 pixels in the height. That is why the rectangle with a x-position of 20 and an y-position of 10 is really 
   located at 200,100, and its width (10) and height (5) corresponds to 100 pixels and 50 pixels.
*/

//.attr("viewBox", "0 0 100 100");


//4. Let's add some circles 
/* select all is used here ahead of time since the data mapping happens after. */
const group = svg.selectAll("g")
// each circle will have a . __data__ attribute property
// data will be mapped to select all from above
.data(data)
//enter is used on each element in data
.enter()
.append("g")

const circles = group.append("circle")

circles.attrs({
  // mapping the element's value to the radius without a scale will generate a very large 		circle
  // we need to add some scales
  "r": el => scale(el.value),
  // we can also pass element and index as params
  "cx": (el, i) => (i + 1) * circleMargin,
  "cy": 200,
  // here we can use the color scale
  "fill": el => colorScale(el.value)
})

//add text labels
const textLabel = group.append("text")
textLabel.text(d => d.name)
//attributes for the text
//adding also a class that can be used for styling
textLabel.attrs({
  "text": el => el.name,
  "x": (el, i) => (i + 1) * circleMargin,
  "y": 105,
  "fill": "#ffffff",
  "text-anchor": "middle",
  "class":"text-labels"
}) 
//add text values
const textValues = group.append("text");
textValues.text(d => d.value);
textValues.attrs({
  "x": (el, i) => (i + 1) * circleMargin,
  "y": 205,
  "fill": "#333",
  "text-anchor": "middle",
  "class":"text-value"
});
//add a transition
//we can use the iterator to apply a delay on each element
circles.attr("r", 0).transition().delay((d, i) => i * 250).duration(200).attr("r", el => scale(el.value))

//click event
circles.on("click", function(d) { 
    d3.select(this).transition().duration(500).attr('r', d => scale(d.value) + 10).attr('fill', '#e88200').attrs({"stroke": "#ffffff", "stroke-width": 3})
});

//data update
// d3.select(".data-btn").on("click", () => {
//     // add a random datapoint and remove the first one
//   function generator(){
//       return Math.floor(Math.random()*600)
//   }
//     const data2 = [
//     {name:"a", value:generator()},
//     {name:"b", value:generator()},
//     {name:"c", value:generator()},
//     {name:"d", value:generator()},
//     {name:"e", value:generator()}]

//   circles.data(data2).exit().remove()
//   textValues.data(data2).exit().remove()
//   textValues.text(d => d.value)
//   circles.enter()
//       .append("circle")
//     .attr("r", 0)

//   circles.transition()
//     .duration(500).attrs({
//     //mapping the element's value to the radius without a scale will generate a very large 			circle
//     //we need to add some scales
//     "r": el => scale(el.value),
//     //we can also pass element and index as params
//     "cx": (el, i) => (i + 1) * circleMargin,
//     "cy": 200,
//     // here we can use the color scale
//     "fill":(el) => colorScale(el.value)
//     })
// })


