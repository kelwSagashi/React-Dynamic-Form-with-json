import { CreateInputField } from "./FormsElements";

export default function InputField(key, handleFormData, formFields, formData, setFormData) {
    return (
        <CreateInputField 
            object={formFields[key]} 
            field={key} 
            value={formData[key]} 
            handleChange={handleFormData}
            className={""} 
            key={key}
            setFormData={setFormData}
        />
    )
}