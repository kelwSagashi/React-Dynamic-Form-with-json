import { CreateNestedInputField } from "./FormsElements";

export default function NestedInputField(key, handleFormNestedData, formFields, formData, setFormData){
    return (
        <CreateNestedInputField 
            object={formFields[key]}
            formData={formData[key]}
            handleChange={handleFormNestedData}
            key={key} 
            mainKey={key} 
            className={""}
            setFormData={setFormData}
        />
    )
}