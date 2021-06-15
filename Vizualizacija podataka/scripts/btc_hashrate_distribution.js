// set the dimensions and margins of the graph
var marginHashrateBtc = { top: 30, right: 30, bottom: 70, left: 60 },
  widthHashrateBtc = 690 - marginHashrateBtc.left - marginHashrateBtc.right,
  heightHashrateBtc = 520 - marginHashrateBtc.top - marginHashrateBtc.bottom;

// append the btcSvg object to the body of the page
var btcSvg = d3.select("#btc-hashrate-distribution-chart")
  .append("svg")
  .attr("width", widthHashrateBtc + marginHashrateBtc.left + marginHashrateBtc.right)
  .attr("height", heightHashrateBtc + marginHashrateBtc.top + marginHashrateBtc.bottom)
  .append("g")
  .attr("transform",
    "translate(" + marginHashrateBtc.left + "," + marginHashrateBtc.top + ")");

d3.csv("data/btc-hashrate-distribution.csv", function (data) {

  var xBtc = d3.scaleBand()
    .range([0, widthHashrateBtc])
    .domain(data.map(function (d) { return d.miner; }))
    .padding(0.2);
  btcSvg.append("g")
    .attr("class", "axisGray")
    .attr("transform", "translate(0," + heightHashrateBtc + ")")
    .call(d3.axisBottom(xBtc))
    .selectAll("text")
    .attr("font-size", "16px")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  btcSvg.append("text")
    .attr("x", (widthHashrateBtc / 2))
    .attr("y", (marginHashrateBtc.top / 4))
    .attr("fill", "#A6A6A6")
    .attr("font-weight", "bold")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Hashrate distribution");

  var yBtc = d3.scaleLinear()
    .domain([0, 400])
    .range([heightHashrateBtc, 0]);

  btcSvg.append("g")
    .attr("class", "axisGray")
    .call(d3.axisLeft(yBtc))
    .selectAll("text")
    .attr("font-size", "14px")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(heightHashrateBtc / 2))
    .attr("y", -((marginHashrateBtc.left / 2) + 10))
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Number of nodes");

  btcSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return xBtc(d.miner); })
    .attr("y", function (d) { return yBtc(d.count); })
    .attr("width", xBtc.bandwidth())
    .attr("height", function (d) { return heightHashrateBtc - yBtc(0); })
    .attr("fill", "#f2a900");


  btcSvg.selectAll("rect")
    .transition()
    .duration(700)
    .attr("y", function (d) { return yBtc(d.count) })
    .attr("height", function (d) { return heightHashrateBtc - yBtc(d.count) })
    .delay(function (d, i) { return (i * 50) });

})