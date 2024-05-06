import { toast } from "react-toastify";
import { validateForm } from "./ValidadeForm";

export const handleSubmit = async (e, formFields, formData, endpoint, dataId, onEdit, setError, setLoading, refreshData, closeForm, file) =>{
    e.preventDefault();

    const errors = validateForm(formData, formFields);

    if (errors.length > 0){
        for (const err in errors){
            toast.warning(errors[err].message);
        }
        return;
    }

    const req = onEdit ? 
    {contentType: "multipart/form-data", endpoint: endpoint, method:"put", data: formData, dataId: dataId } :
    {contentType: "multipart/form-data", endpoint: endpoint, method:"post", data: formData, dataId: dataId };
    
    if (true){ /*Coloque seu método de reqisição aqui (Use a const req para determinar sua requisição)*/
        toast.success("Dado" + " " + (onEdit ? "Alterado" : "Criado") + " " + "com Sucesso!");
    }else{
        toast.warning("Ocorreu algum erro!");
    }

    refreshData && await refreshData();
    closeForm(e);
}