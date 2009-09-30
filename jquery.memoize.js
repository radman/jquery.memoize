// Author: Radu Vlad
// Date: September 29, 2009

(function($){

  // TODO: rewrite this with my usual template plugin and then optimize
  // Signatures: 
  //  - memoize(key, fn)
  //  - memoize("reset", key)
  $.fn.memoize = function(p1, p2) {
    var self = this,
        cache = self.data("_memoization_cache") || {};
    
    if (p1 === "reset" && p2 === undefined) {
      return resetAll();
    } else if (p1 === "reset") {
      return reset(p2);
    } else {
      return fetch(p1, p2);
    }
    
    function reset(key) {
      console.log("resetting " + key);
      cache[key] = undefined;
      self.data("_memoization_cache", cache);
      return true;
    }
    
    function resetAll() {
      console.log("resetting all");
      self.data("_memoization_cache", {});
      return true;
    }
    
    function fetch(key, fn) {
      if (cache[key] == undefined) {
        console.log(key + " (uncached)");
        cache[key] = fn();
        self.data("_memoization_cache", cache);
      }

      console.log(key + " (cached)");
      return cache[key];   
    }
  };

})(jQuery);