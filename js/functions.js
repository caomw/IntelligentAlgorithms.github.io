cache_flag = false;
cache_val = 0;
var stdNormalDistr = function() {


    if(cache_flag) { 
      cache_flag = false;
      return cache_val; 
    }

    var u = 2*Math.random()-1;
    var v = 2*Math.random()-1;
    var rds = u*u + v*v;

    while(rds == 0 || rds > 1) {
      u = Math.random()*2-1;
      v = Math.random()*2-1;
      rds = u*u + v*v;
    }
    var c = Math.sqrt(-2*Math.log(rds)/rds);
    cache_val = v*c;
    cache_flag = true;
    return u*c;
  }
var normalDistr = function(mu, sig){ return mu+stdNormalDistr()*sig; }
