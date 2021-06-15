var ethBlockData;

var margin = { top: 10, right: 30, bottom: 30, left: 120 },
    width = 700 - margin.left - margin.right,
    height = 580 - margin.top - margin.bottom;

var ethBlockSvg = d3.select("#eth-avg-block-size-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/eth-avg-block-size.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value / 1000000 }
    },
    function (data) {
        ethBlockData = data;

        var x = d3.scaleTime()
            .domain(d3.extent(ethBlockData, function (d) { return d.date; }))
            .range([0, width]);

        ethBlockSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisBottom(x));

        ethBlockSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 6))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("Average block size in MB");


        var y = d3.scaleLinear()
            .domain([0, d3.max(ethBlockData, function (d) { return +d.value; })])
            .range([height, 0])

        ethBlockSvg.append("g")
            .attr("class", "axisGray")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisLeft(y));

        var ethBlockChart = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.value); });

        ethBlockSvg.append("path")
            .datum(ethBlockData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#716b94")
            .attr("stroke-width", 1.5)
            .attr("d", ethBlockChart(ethBlockData));
    })
