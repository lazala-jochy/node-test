export function toSlug(title: string): string {
  // TODO: implementa la funcion

  let result: string = "";

  if(title.length === 0) return ""



 
  let newString = title.trim().replace('!',"").replace("&",'').replace(".","");
  newString = newString.replace(/\s+/g, ' ').trim()
  for(let i: number = 0; i <= newString.length -1; i++){
    if(newString[i] == " " && newString[i-1] !== "-"){
      result += "-"
    }else{
      if(newString[i] !== '!' || newString[i] !== '&' || newString !== '.' ) result+= newString[i].toLowerCase()
    }


  }

  console.log(result)
 

  return result;
}


toSlug("Hello World!");            // "hello-world"
toSlug("  Multiple   Spaces  ");   // "multiple-spaces"
toSlug("Node.js & TypeScript");    // "nodejs-typescript"
toSlug("");                        // ""