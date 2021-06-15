// set the dimensions and margins of the graph
var marginHashrateEth = { top: 30, right: 30, bottom: 70, left: 90 },
  widthHashrateEth = 690 - marginHashrateEth.left - marginHashrateEth.right,
  heightHashrateEth = 520 - marginHashrateEth.top - marginHashrateEth.bottom;

// append the ethSvg object to the body of the page
var ethSvg = d3.select("#eth-hashrate-distribution-chart")
  .append("svg")
  .attr("width", widthHashrateEth + marginHashrateEth.left + marginHashrateEth.right)
  .attr("height", heightHashrateEth + marginHashrateEth.top + marginHashrateEth.bottom)
  .append("g")
  .attr("transform",
    "translate(" + marginHashrateEth.left + "," + marginHashrateEth.top + ")");

d3.csv("data/eth-hashrate-distribution.csv", function (data) {

  var xEth = d3.scaleBand()
    .range([0, widthHashrateEth])
    .domain(data.map(function (d) { return d.miner; }))
    .padding(0.2);
  ethSvg.append("g")
    .attr("class", "axisGray")
    .attr("transform", "translate(0," + heightHashrateEth + ")")
    .call(d3.axisBottom(xEth))
    .selectAll("text")
    .attr("font-size", "10px")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  ethSvg.append("text")
    .attr("x", (widthHashrateEth / 2))
    .attr("y", (marginHashrateEth.top / 4))
    .attr("fill", "#A6A6A6")
    .attr("font-weight", "bold")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Hashrate distribution");

  var yEth = d3.scaleLinear()
    .domain([0, 24000])
    .range([heightHashrateEth, 0]);

  ethSvg.append("g")
    .attr("class", "axisGray")
    .call(d3.axisLeft(yEth))
    .selectAll("text")
    .attr("font-size", "14px")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(heightHashrateEth / 2))
    .attr("y", -((marginHashrateEth.left / 2) + 100))
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Number of nodes");

  ethSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return xEth(d.miner); })
    .attr("y", function (d) { return yEth(d.count); })
    .attr("width", xEth.bandwidth())
    .attr("height", function (d) { return heightHashrateEth - yEth(0); })
    .attr("fill", "#716b94");

  ethSvg.selectAll("rect")
    .transition()
    .duration(160)
    .attr("y", function (d) { return yEth(d.count) })
    .attr("height", function (d) { return heightHashrateBtc - yEth(d.count) })
    .delay(function (d, i) { return (i * 50) });

})