//width and height
var w = 500;
var h = 300;

var dataset = {
  nodes: [
    { name: "Bad" },
    { name: "Busters" },
    { name: "Ruin" },
    { name: "Our" },
    { name: "Young" },
    { name: "Grass" },
    { name: "But" },
    { name: "Violets" },
    { name: "Grow" },
    { name: "Wildly" }
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 }
  ]
};
//default force layout
var force = d3.layout.force()
  .nodes(dataset.nodes)
  .links(dataset.edges)
  .size([w, h])
  .linkDistance([50])
  .charge([-100])
  .start();
var colors = d3.scale.category10();

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//create edges as lines
var edges = svg.selectAll("line")
  .data(dataset.edges)
  .enter()
  .append("line")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

//Create nodes as circles
var nodes = svg.selectAll("circle")
  .data(dataset.nodes)
  .enter()
  .append("circle")
  .attr("r", 10)
  .style("fill", function(d, i) {
    return colors(i);
  })
  .call(force.drag);

//event loop for animation
force.on("tick", function() {
  edges.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  nodes.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

});