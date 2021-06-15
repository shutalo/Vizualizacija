var ethBlockchainData;

var marginBlockchainSize = { top: 10, right: 30, bottom: 30, left: 120 },
    width = 700 - marginBlockchainSize.left - marginBlockchainSize.right,
    height = 540 - marginBlockchainSize.top - marginBlockchainSize.bottom;

var ethBlockchainSvg = d3.select("#eth-blockchain-size-chart")
    .append("svg")
    .attr("width", width + marginBlockchainSize.left + marginBlockchainSize.right)
    .attr("height", height + marginBlockchainSize.top + marginBlockchainSize.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginBlockchainSize.left + "," + marginBlockchainSize.top + ")");

d3.csv("data/eth-blockchain-size.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value}
    },
    function (data) {
        ethBlockchainData = data;

        var xEth = d3.scaleTime()
            .domain(d3.extent(ethBlockchainData, function (d) { return d.date; }))
            .range([0, width]);

        ethBlockchainSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisBottom(xEth));

        ethBlockchainSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (marginBlockchainSize.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("Blockchain size in MB");


        var yEth = d3.scaleLinear()
            .domain([0, d3.max(ethBlockchainData, function (d) { return +d.value; })])
            .range([height, 0])

        ethBlockchainSvg.append("g")
            .attr("class", "axisGray")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisLeft(yEth));

        var ethBlockchainChart = d3.line()
            .x(function (d) { return xEth(d.date); })
            .y(function (d) { return yEth(d.value); });

        ethBlockchainSvg.append("path")
            .datum(ethBlockchainData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#716b94")
            .attr("stroke-width", 1.5)
            .attr("d", ethBlockchainChart(ethBlockchainData));
    })
