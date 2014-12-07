function rnd_bmt(mu,std) {
    var x = 0, y = 0, rds, c;
    do {
    x = Math.random()*2-1;
    y = Math.random()*2-1;
    rds = x*x + y*y;
    }
    while (rds == 0 || rds > 1)
    c = Math.sqrt(-2*Math.log(rds)/rds);
    return x*c*std+mu;
}
var mu_1 = 0;
var mu_2 = 3;
var sigma = 0.5;

var meancharPlot;
    var width  = 620,
        height = 320;
var xValue = function(d) { return d.x;},               // data -> value
    xScale = d3.scale.linear().range([0, width]),      // value -> display
    xMap   = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis  = d3.svg.axis().scale(xScale).orient("bottom");

var yValue = function(d) { return d.y;},               // data -> value
    yScale = d3.scale.linear().range([height, 0]),     // value -> display
    yMap   = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis  = d3.svg.axis().scale(yScale).orient("left");

function updateMeanchart(){

    for (var i = 0; i < 50; i+=2) {
        data[i] = {
            x : rnd_bmt(0,0.5), 
            y : rnd_bmt(0,0.5), 
            label: 0};
        data[i+1] = {
            x : rnd_bmt(3,0.5), 
            y : rnd_bmt(3,0.5), 
            label: 1};
    };


    meancharPlot.selectAll("circle").data(data)
        .transition()
        .duration(1200)
        .attr("cx", xMap)
        .attr("cy", yMap);
}
var data = [];
function meanchart(){
    
    for (var i = 0; i < 50; i++) {
        data.push({
            x : rnd_bmt(0,0.5), 
            y : rnd_bmt(0,0.5), 
            label: 0});
        data.push({
            x : rnd_bmt(3,0.5), 
            y : rnd_bmt(3,0.5), 
            label: 1});
    };


    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
    yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);


    meancharPlot = d3.select(".meanchart")
        .attr("width", width)
        .attr("height", height);

    meancharPlot.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("class", function(d){
            if(d.label == 1)
                return "classA";
            return "classB";
          })

          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
    meancharPlot.selectAll(".dot")
          .data([{x:1,y:1}])
          .enter().append("circle")
          .attr("class","unkown")
          .attr("r", 4.5)
          .attr("cx", xMap)
          .attr("cy", yMap);
}
setInterval(function() {
  updateMeanchart();
}, 1500);