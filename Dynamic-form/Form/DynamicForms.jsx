import { useEffect, useRef, useState } from "react";
import { handleFormDataChange, handleFormFileDataChange, handleFormNestedDataChange } from "./HandleFormChanges";
import Fields from "./FormFields";
import {extractKeys} from "./ExtractKeysFields"
import '../Styles/Form.css';
import { handleSubmit } from "./HandleSubmit";

function FormTitle({formData, formName, onEdit}){
    return (
        <h2>{`${onEdit ? "Editar" : "Cadastro de"} ${formName} ${onEdit ? "- " + formData.Nome : ""}`}</h2>
    )
}

function FormObservation({text}){
    return (
        <p>{text}</p>
    )
}

export default function DynamicForm({onEdit, formFields, refreshData, endpoint, formName, closeForm, editData}) {
    const ref = useRef();
    const [formData, setFormData] = useState(extractKeys(formFields));
    const [dataId, setDataId] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError ] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (onEdit){
            const {_id, ...rest} = editData
            setFormData(rest);
            setDataId(_id);
            setFile(editData.Imagem);
        }
    }, [onEdit, editData])

    const fields = Fields(handleFormDataChange, handleFormFileDataChange, handleFormNestedDataChange, formFields, formData, setFormData, onEdit, file, setFile);

    return (
        <div className='form-content' >
            <FormTitle formData={formData} formName={formName} onEdit={onEdit}/>
            {onEdit && <FormObservation text={"Não se preocupe se acabar deixando um campo vazio aqui, ele não será mudado a menos que você digite algo novo"}/>}
            <form className='input-area' onSubmit={
                (e) => handleSubmit(e, formFields, formData, endpoint, dataId, onEdit, setError, setLoading, refreshData, closeForm, file)
            } ref={ref} >
            {fields}
                <div className='form-field-buttons'>
                {onEdit ?
                    <button className='form-button-save' type="submit">Salvar</button> :
                    <button className='form-button-add' type="submit">Adicionar</button>
                }
                <button className='form-button-cancel' onClick={closeForm}>Cancelar</button>
                </div>
            </form> 
        </div>
    );
}