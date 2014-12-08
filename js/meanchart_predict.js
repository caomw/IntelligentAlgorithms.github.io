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





function meanchart_predict(){


var data_predict = [];
var unkown = [{x:1,y:1}];

var meancharPlot_predict;
var width  = 620,
    height = 320;

var xValue_p = function(d) { return d.x;},               // data_predict -> value
    xScale_p = d3.scale.linear().range([0, width]),      // value -> display
    xMap_p   = function(d) { return xScale_p(xValue_p(d));}, // data_predict -> display
    xAxis_p  = d3.svg.axis().scale(xScale_p).orient("bottom");

var yValue_p = function(d) { return d.y;},               // data_predict -> value
    yScale_p = d3.scale.linear().range([height, 0]),     // value -> display
    yMap_p   = function(d) { return yScale_p(yValue_p(d));}, // data_predict -> display
    yAxis_p  = d3.svg.axis().scale(yScale_p).orient("left");

   var nData = 100;
   
   var center_a = [{x:0,y:0}];
   var center_b = [{x:0,y:0}]; 

   data_predict = [];
    for (var i = 0; i < nData; i+=2) {

        var x_a = rnd_bmt(0,sigma);
        var y_a = rnd_bmt(0,sigma);

        var x_b = rnd_bmt(3,sigma);
        var y_b = rnd_bmt(3,sigma);

        data_predict.push({
            x : x_a, 
            y : y_a, 
            label: 0});
        data_predict.push({
            x : x_b, 
            y : y_b, 
            label: 1});
    };

    for (var i = 0; i < nData; i+=2) {
        center_a[0].x += data_predict[i].x;
        center_a[0].y += data_predict[i].y;
        data_predict[i].label = 0;
        center_b[0].x += data_predict[i+1].x;
        center_b[0].y += data_predict[i+1].y;
        data_predict[i+1].label = 1;
    };

    center_a[0].x /= nData/2;
    center_a[0].y /= nData/2;
    center_b[0].x /= nData/2;
    center_b[0].y /= nData/2;

    xScale_p.domain([d3.min(data_predict, xValue_p)-1, d3.max(data_predict, xValue_p)+1]);
    yScale_p.domain([d3.min(data_predict, yValue_p)-1, d3.max(data_predict, yValue_p)+1]);


    meancharPlot_predict = d3.select(".meanchart_predict")
        .attr("width", width)
        .attr("height", height);

    meancharPlot_predict.selectAll(".dot")
          .data(data_predict)
          .enter().append("circle")
          .attr("class", function(d){
            if(d.label == 1)
                return "classA";
            return "classB";
          })
          .attr("r", 3.5)
          .attr("cx", xMap_p)
          .attr("cy", yMap_p);

    meancharPlot_predict.selectAll(".dot")
          .data(center_a)
          .enter().append("circle")
          .attr("class","classC")
          .attr("r",8)
          .attr("cx", xMap_p)
          .attr("cy", yMap_p);

    meancharPlot_predict.selectAll(".dot")
          .data(center_b)
          .enter().append("circle")
          .attr("class","classC")
          .attr("r",8)
          .attr("cx", xMap_p)
          .attr("cy", yMap_p);

    meancharPlot_predict.selectAll(".dot")
          .data(unkown)
          .enter().append("circle")
          .attr("class","unkown")
          .attr("r", 4.5)
          .attr("cx", xMap_p)
          .style("stroke-width", 3)
          .style('stroke','gray')
          .attr("cy", yMap_p);




    meancharPlot_predict
    .on("mousemove", function() { var pt = d3.mouse(this); 
        unkown.x = pt[0];
        unkown.y = pt[1];
  
        var d = d3.select(".meanchart_predict")
        .selectAll(".unkown")
        .data(data_predict)
        .attr("cx", pt[0])
        .attr("cy", pt[1])
        .style("stroke-width", 3)
        .style("stroke",function(d){

            var dist_a = (pt[0]-xMap_p(center_a[0]))*(pt[0]-xMap_p(center_a[0])) + (pt[1]-yMap_p(center_a[0]))*(pt[1]-yMap_p(center_a[0]));
            var dist_b = (pt[0]-xMap_p(center_b[0]))*(pt[0]-xMap_p(center_b[0])) + (pt[1]-yMap_p(center_b[0]))*(pt[1]-yMap_p(center_b[0]));

            if(dist_a < dist_b){
                return "#ff7f00";
            }else{
                return "#1f78b4";
            }
        });
});
 
}
