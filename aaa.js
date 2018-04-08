function add(a, b) {
   return a + b
}


function sub(a, b) {
   return a - b
}


function compute(a, b, handle) {
   return handle(a, b)
}


compute(1, 2, add)
compute(1, 2, sub)