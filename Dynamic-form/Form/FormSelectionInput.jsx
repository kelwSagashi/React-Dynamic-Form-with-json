import { SelectionBox } from "./FormsElements";

export default function SelectionOptionBox(key, handleFormData, formFields, formData, setFormData, onEdit){
    return (
        <SelectionBox 
            object={formFields[key]} 
            field={key} 
            value={formData[key]} 
            handleChange={handleFormData} 
            key={key} 
            onEdit={onEdit}
            setFormData={setFormData}
        />
    )
}