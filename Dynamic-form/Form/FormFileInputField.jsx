import { CreateFileInputField } from "./FormsElements";

export default function FileInputField(key, handleFormFileData, formFields, formData, onEdit, file, setFile){
    return (
        <CreateFileInputField 
            object={formFields[key]} 
            field={key} 
            value={formData[key]} 
            handleChange={handleFormFileData}
            setFile={setFile}
            file={file}
            className={""} 
            key={key}
            onEdit={onEdit}
            formData={formData}
        />
    )
}