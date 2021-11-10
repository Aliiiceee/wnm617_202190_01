const query = (options) => {
   // Fetch is a promise
   return fetch('data/api.php',{
      method:'POST',
      body:JSON.stringify(options),
      headers:{'Content-Type':'application/json'}
   }).then(d=>d.json());
}


// Curried Function
const templater = f => a =>
   (Array.isArray(a)?a:[a])
   .reduce((r,o,i,a)=>r+f(o,i,a),'');

/*
function templater(func) {
   return function(a) {
      return (Array.isArray(a)?a:[a])
         .reduce(function(reducer,obj,ind,arr){
            return reducer + func(obj,ind,arr);
         }
      )
   }
}
*/