var btcBlockchainData;

var marginBlockchainSize = { top: 10, right: 30, bottom: 30, left: 120 },
    width = 700 - marginBlockchainSize.left - marginBlockchainSize.right,
    height = 560 - marginBlockchainSize.top - marginBlockchainSize.bottom;

var btcBlockchainSvg = d3.select("#btc-blockchain-size-chart")
    .append("svg")
    .attr("width", width + marginBlockchainSize.left + marginBlockchainSize.right)
    .attr("height", height + marginBlockchainSize.top + marginBlockchainSize.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginBlockchainSize.left + "," + marginBlockchainSize.top + ")");

d3.csv("data/btc-blockchain-size.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value}
    },
    function (data) {
        btcBlockchainData = data;

        var xBtc = d3.scaleTime()
            .domain(d3.extent(btcBlockchainData, function (d) { return d.date; }))
            .range([0, width]);

        btcBlockchainSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisBottom(xBtc));

        btcBlockchainSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (marginBlockchainSize.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("Blockchain size in MB");

        var yBtc = d3.scaleLinear()
            .domain([0, d3.max(btcBlockchainData, function (d) { return +d.value; })])
            .range([height, 0])

        btcBlockchainSvg.append("g")
            .attr("class", "axisGray")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisLeft(yBtc));

        var btcBlockchainChart = d3.line()
            .x(function (d) { return xBtc(d.date); })
            .y(function (d) { return yBtc(d.value); });

        btcBlockchainSvg.append("path")
            .datum(btcBlockchainData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#f2a900")
            .attr("stroke-width", 1.5)
            .attr("d", btcBlockchainChart(btcBlockchainData));
    })
