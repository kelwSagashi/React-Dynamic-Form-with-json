export const extractKeys = (object) => {
    const saida = {};
  
    for (const key in object) {
        if (object[key].type === "object") {
            saida[key] = extractKeys(object[key].objects);
        } else if (object[key].type === "array") {
            if (object[key].elements[0].type === "object") {
              saida[key] = [];
              for (const element of object[key].elements) {
                saida[key].push(extractKeys(element));
              }
            } else {
              saida[key] = "";
            }
        } 
        else {
            saida[key] = "";
        }
    }
    return saida;
};