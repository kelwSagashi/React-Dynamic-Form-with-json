export const validateForm = (object, fields) => {
    const errors = [];
  
    // Percorre cada campo do objeto
    for (const key in object) {
      const field = fields[key];
  
      // Se o campo não existe na definição de campos, ignora
      if (!field) continue;
  
      // Se o campo é obrigatório e se não está preenchido
      if (field.required && !object[key]) {
        errors.push({
          field: key,
          message: `O campo ${field.label} é obrigatório.`,
        });
      }
  
      // Se o campo é uma referência, valida se o valor está preenchido
      // if (field.type === "ref") {
      //   if (!object[key]) {
      //     errors.push({
      //       field: key,
      //       message: `O campo ${field.label} é obrigatório.`,
      //     });
      //   }
      // }
    }
  
    return errors;
};