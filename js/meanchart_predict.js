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

var meancharPlot_predict;
    var width  = 620,
        height = 320;
var xValue = function(d) { return d.x;},               // data_predict -> value
    xScale = d3.scale.linear().range([0, width]),      // value -> display
    xMap   = function(d) { return xScale(xValue(d));}, // data_predict -> display
    xAxis  = d3.svg.axis().scale(xScale).orient("bottom");

var yValue = function(d) { return d.y;},               // data_predict -> value
    yScale = d3.scale.linear().range([height, 0]),     // value -> display
    yMap   = function(d) { return yScale(yValue(d));}, // data_predict -> display
    yAxis  = d3.svg.axis().scale(yScale).orient("left");

var data_predict = [];

var unkown = [{x:1,y:1}];
function meanchart_predict(){
   
   var center_a = [{x:0,y:0}];
    var center_b = [{x:0,y:0}]; 


    for (var i = 0; i < 50; i++) {

        var x_a = rnd_bmt(0,0.5);
        var y_a = rnd_bmt(0,0.5);

        var x_b = rnd_bmt(3,0.5);
        var y_b = rnd_bmt(3,0.5);

        data_predict.push({
            x : x_a, 
            y : y_a, 
            label: 0});
        data_predict.push({
            x : x_b, 
            y : y_b, 
            label: 1});
    };
    xScale.domain([d3.min(data_predict, xValue)-1, d3.max(data_predict, xValue)+1]);
    yScale.domain([d3.min(data_predict, yValue)-1, d3.max(data_predict, yValue)+1]);



    for (var i = 0; i < 50; i+=2) {
        center_a[0].x += data_predict[i].x;
        center_a[0].y += data_predict[i].y;
        center_b[0].x += data_predict[i+1].x;
        center_b[0].y += data_predict[i+1].y;
    };

    center_a[0].x = center_a[0].x/50.0;
    center_a[0].y = center_a[0].y/50.0;
    center_b[0].x = center_b[0].x/50.0;
    center_b[0].y = center_b[0].y/50.0;


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
          .attr("cx", xMap)
          .attr("cy", yMap)

    meancharPlot_predict.selectAll(".dot")
          .data(unkown)
          .enter().append("circle")
          .attr("class","unkown")
          .attr("r", 4.5)
          .attr("cx", xMap)
          .attr("cy", yMap);

    meancharPlot_predict.selectAll(".dot")
          .data(center_a)
          .enter().append("circle")
          .attr("class","classB")
          .attr("r",8)
          .attr("cx", xMap)
          .attr("cy", yMap);

    meancharPlot_predict.selectAll(".dot")
          .data(center_b)
          .enter().append("circle")
          .attr("class","classA")
          .attr("r",8)
          .attr("cx", xMap)
          .attr("cy", yMap);

    meancharPlot_predict
    .on("mousemove", function() { var pt = d3.mouse(this); 
        unkown.x = pt[0];
        unkown.y = pt[1];
  
        var d = d3.select(".meanchart_predict")
        .selectAll(".unkown")
        .data(data_predict)
        .attr("cx", pt[0])
        .attr("cy", pt[1])
        .style("fill",function(d){

            var dist_a = (pt[0]-xMap(center_a))*(pt[0]-xMap(center_a)) + (pt[1]-yMap(center_a))*(pt[1]-yMap(center_a));
            var dist_b = (pt[0]-xMap(center_b))*(pt[0]-xMap(center_b)) + (pt[1]-yMap(center_b))*(pt[1]-yMap(center_b));

            if(dist_a > dist_b){
                return "steelblue";
            }else{
                return "darkred";
            }
        })

     });
}
