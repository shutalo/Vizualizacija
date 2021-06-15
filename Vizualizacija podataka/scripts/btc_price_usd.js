var btcData;

var margin = { top: 10, right: 30, bottom: 30, left: 100 },
    width = 700 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

var btcSvg = d3.select("#btc-chart-price-usd")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/btc-price.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
    },
    function (data) {
        btcData = data;

        var x = d3.scaleTime()
            .domain(d3.extent(btcData, function (d) { return d.date; }))
            .range([0, width]);

        btcSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisBottom(x));

        btcSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("BTC in USD");


        var y = d3.scaleLinear()
            .domain([0, d3.max(btcData, function (d) { return +d.value; })])
            .range([height, 0])

        btcSvg.append("g")
            .attr("class", "axisGray")
            .attr("style", "font-size:15px")
            .attr("stroke-width", 1)
            .call(d3.axisLeft(y));

        var btcChart = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.value); });

        btcSvg.append("path")
            .datum(btcData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#f2a900")
            .attr("stroke-width", 1.5)
            .attr("d", btcChart(btcData));
    })
