var ethData;

var margin = { top: 10, right: 50, bottom: 40, left: 100 },
    width = 700 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

var ethSvg = d3.select("#eth-chart-price-usd")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/eth-price.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), usd: d.usd, btc: d.btc }
    },
    function (data) {
        ethData = data;

        var x = d3.scaleTime()
            .domain(d3.extent(ethData, function (d) { return d.date; }))
            .range([0, width]);

        ethSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .call(d3.axisBottom(x))

        ethSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("ETH in USD/BTC");

        var yUsd = d3.scaleLinear()
            .domain([0, d3.max(ethData, function (d) { return +d.usd; })])
            .range([height, 0])

        var ethUsdChart = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return yUsd(d.usd); });

        ethSvg.append("g")
            .attr("class", "axisGray")
            .attr("id", "usdAxis")
            .attr("style", "font-size:15px")
            .call(d3.axisLeft(yUsd));

        ethSvg.append("path")
            .datum(ethData)
            .attr("class", "line")
            .attr("id", "ethUsdLine")
            .attr("fill", "none")
            .attr("stroke", "#716b94")
            .attr("stroke-width", 1.5)
            .attr("d", ethUsdChart(ethData));

        showEthInUsd = function () {

            if (d3.select("#eth-input-usd-option").property("checked")) {

                var ethUsdChart = d3.line()
                    .x(function (d) { return x(d.date); })
                    .y(function (d) { return yUsd(d.usd); });

                ethSvg.append("g")
                    .attr("class", "axisGray")
                    .attr("id", "usdAxis")
                    .attr("style", "font-size:15px")
                    .call(d3.axisLeft(yUsd))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -(height / 2))
                    .attr("y", -((margin.left)) + 35)
                    .style("text-anchor", "middle")
                    .style("font-size", "15px")
                    .text("$USD");

                ethSvg.append("path")
                    .datum(ethData)
                    .attr("class", "line")
                    .attr("id", "ethUsdLine")
                    .attr("fill", "none")
                    .attr("stroke", "#716b94")
                    .attr("stroke-width", 1.5)
                    .attr("d", ethUsdChart(ethData));

            } else if (d3.select("#eth-input-usd-option").property("checked") == false) {
                d3.select("#ethUsdLine").remove()
                d3.select("#usdAxis").remove()
            }

        }

        showEthInBtc = function () {

            if (d3.select("#eth-input-btc-option").property("checked")) {

                var yBtc = d3.scaleLinear()
                    .domain([0, d3.max(ethData, function (d) { return +d.btc; })])
                    .range([height, 0])

                var ethBtcChart = d3.line()
                    .x(function (d) { return x(d.date); })
                    .y(function (d) { return yBtc(d.btc); });

                ethSvg.append("g")
                    .attr("class", "axisGray")
                    .attr("id", "btcAxis")
                    .attr("style", "font-size:15px")
                    .attr("transform", "translate(" + width + " ,0)")
                    .call(d3.axisRight(yBtc));

                ethSvg.append("path")
                    .datum(ethData)
                    .attr("id", "ethBtcLine")
                    .attr("class", "line")
                    .attr("fill", "none")
                    .attr("stroke", "#F2A900")
                    .attr("stroke-width", 1.5)
                    .attr("d", ethBtcChart(ethData));

            } else {
                d3.select("#btcAxis").remove()
                d3.select("#ethBtcLine").remove()
            }

        }

    })
