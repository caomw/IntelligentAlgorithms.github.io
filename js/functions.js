cache_flag = false;
cache_val = 0;

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

/////////////////////// http://stackoverflow.com/questions/1988349/array-push-if-does-not-exist
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

var LaplaceDensity = function(x,mu,b){

  return 1.0/(2*b)*Math.exp(-1*Math.abs(x-mu)/b);

}

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

function resetfield(el,v){
    $(el).val(v);
}

var count = 0,
      overshoot = 300;
function whenBoundsVisible(computeBounds, callback) {
    var id = ".visible-" + ++count,
        self = d3.select(window),
        bounds;

    if (document.readyState === "loading") self.on("load" + id, loaded);
    else loaded();

    function loaded() {
      self
          .on("resize" + id, resized)
          .on("scroll" + id, scrolled)
          .each(resized);
    }

    function resized() {
      bounds = computeBounds();
      if (bounds[1] < bounds[0]) bounds.reverse();
      scrolled();
    }

    function scrolled() {
      if (bounds[0] <= pageYOffset && pageYOffset <= bounds[1]) {
        callback(null);
        self.on(id, null);
      }
    }
  }

whenFullyVisible = function(element, callback) {
    return whenBoundsVisible(function() {
      var rect = element.getBoundingClientRect();
      return [
        rect.bottom + pageYOffset - innerHeight,
        rect.top + pageYOffset
      ];
    }, callback);
  };