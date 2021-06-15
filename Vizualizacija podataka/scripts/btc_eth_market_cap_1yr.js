var marketCapData;

var marketCapMargin = { top: 10, right: 30, bottom: 30, left: 150 },
    marketCapWidth = 1080 - marketCapMargin.left - marketCapMargin.right,
    marketCapHeight = 560 - marketCapMargin.top - marketCapMargin.bottom;

var marketCapSvg = d3.select("#btc-eth-market-cap-chart")
    .append("svg")
    .attr("width", marketCapWidth + marketCapMargin.left + marketCapMargin.right)
    .attr("height", marketCapHeight + marketCapMargin.top + marketCapMargin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marketCapMargin.left + "," + marketCapMargin.top + ")");

d3.csv("data/btc-eth-market-cap.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), btc: d.btc, eth: d.eth }
    },
    function (data) {
        marketCapData = data;

        var x = d3.scaleTime()
            .domain(d3.extent(marketCapData, function (d) { return d.date; }))
            .range([0, marketCapWidth]);

        marketCapSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .call(d3.axisBottom(x))

        marketCapSvg.append("text")
            .attr("x", (width / 2 + 100))
            .attr("y", (margin.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("Market cap in USD");

        var y = d3.scaleLinear()
            .domain([0, d3.max(marketCapData, function (d) { return +d.btc; })])
            .range([marketCapHeight, 0])

        marketCapSvg.append("g")
            .attr("class", "axisGray")
            .attr("style", "font-size:15px")
            .call(d3.axisLeft(y));

        var marketCapChartBtc = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.btc); });

        marketCapSvg.append("path")
            .datum(marketCapData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#F2A900")
            .attr("stroke-width", 1.5)
            .attr("d", marketCapChartBtc(marketCapData));

        var marketCapChartEth = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.eth); });

        marketCapSvg.append("path")
            .datum(marketCapData)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#716b94")
            .attr("stroke-width", 1.5)
            .attr("d", marketCapChartEth(marketCapData));
    })
