import FileInputField from "./FormFileInputField";
import InputField from "./FormInputField";
import NestedInputField from "./FormNestedInputField";
import SelectionOptionBox from "./FormSelectionInput";

export default function Fields(handleFormData, handleFormFileData, handleFormNestedData, formFields, formData, setFormData, onEdit, file, setFile){
    return Object.keys(formFields).map((key) => {
        if (formFields[key].type == "object")
            return NestedInputField(key, handleFormNestedData, formFields, formData, setFormData);

        if (formFields[key].type == "ref")
            return SelectionOptionBox(key, handleFormData, formFields, formData, setFormData, onEdit);

        if (formFields[key].type == "file")
            return FileInputField(key, handleFormFileData, formFields, formData, onEdit, file, setFile);

        return InputField(key, handleFormData, formFields, formData, setFormData);
    });
}