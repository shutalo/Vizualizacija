var feeData;

var marginAvgFee = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 900 - marginAvgFee.left - marginAvgFee.right,
    height = 520 - marginAvgFee.top - marginAvgFee.bottom;

var feeSvg = d3.select("#avg-tx-fee-chart")
    .append("svg")
    .attr("width", width + marginAvgFee.left + marginAvgFee.right)
    .attr("height", height + marginAvgFee.top + marginAvgFee.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginAvgFee.left + "," + marginAvgFee.top + ")");

d3.csv("data/avg-transaction-fee.csv",
    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), btc: d.btc, eth: d.eth }
    },
    function (data) {
        feeData = data;

        var x = d3.scaleTime()
            .domain(d3.extent(feeData, function (d) { return d.date; }))
            .range([0, width]);

        feeSvg.append("g")
            .attr("class", "axisGray")
            .attr("transform", "translate(0," + height + ")")
            .attr("style", "font-size:15px")
            .call(d3.axisBottom(x))

        feeSvg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top / 4))
            .attr("fill", "#A6A6A6")
            .attr("font-weight", "bold")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text("Average fee per transaction in USD");


        var yEth = d3.scaleLinear()
            .domain([0, d3.max(feeData, function (d) { return +d.eth; })])
            .range([height, 0])

        var btcFeeChart = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return yEth(d.btc); });

        feeSvg.append("g")
            .attr("class", "axisGray")
            .attr("id", "btcFeeAxis")
            .attr("style", "font-size:15px")
            .call(d3.axisLeft(yEth));

        feeSvg.append("path")
            .datum(feeData)
            .attr("class", "line")
            .attr("id", "btcFeeLine")
            .attr("fill", "none")
            .attr("stroke", "#F2A900")
            .attr("stroke-width", 1.5)
            .attr("d", btcFeeChart(feeData));

        showBtcFee = function () {

            if (d3.select("#btc-fee-option").property("checked")) {

                var btcFeeChart = d3.line()
                    .x(function (d) { return x(d.date); })
                    .y(function (d) { return yEth(d.btc); });

                feeSvg.append("path")
                    .datum(feeData)
                    .attr("class", "line")
                    .attr("id", "btcFeeLine")
                    .attr("fill", "none")
                    .attr("stroke", "#F2A900")
                    .attr("stroke-width", 1.5)
                    .attr("d", btcFeeChart(feeData));

            } else if (d3.select("#btc-fee-option").property("checked") == false) {
                d3.select("#btcFeeLine").remove()
            }
        }

        showEthFee = function () {

            if (d3.select("#eth-fee-option").property("checked")) {

                var ethFeeChart = d3.line()
                    .x(function (d) { return x(d.date); })
                    .y(function (d) { return yEth(d.eth); });

                feeSvg.append("path")
                    .datum(feeData)
                    .attr("id", "ethFeeLine")
                    .attr("class", "line")
                    .attr("fill", "none")
                    .attr("stroke", "#716b94")
                    .attr("stroke-width", 1.5)
                    .attr("d", ethFeeChart(feeData));

            } else if (d3.select("#eth-fee-option").property("checked") == false) {
                d3.select("#ethFeeLine").remove()
            }
        }

    })
