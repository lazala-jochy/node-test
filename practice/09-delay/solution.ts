export function delay(ms: number): Promise<void> {
  // TODO: implementa la funcion
  return  new Promise(resolve => setTimeout(resolve, ms));
 
}

delay(100);
delay(0);

/*

const resolvedPromise = Promise.resolve('Success');
resolvedPromise.then(value => {
  console.log(value); // Output: 'Success'
});


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

*/
