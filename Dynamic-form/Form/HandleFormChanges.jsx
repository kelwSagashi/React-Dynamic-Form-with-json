export const handleFormFileDataChange = (name, file, formData) => {
    formData[name]=file;
}

export const handleFormDataChange = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
};

export const handleFormNestedDataChange = (event, setFormData) => {
    const { name, value } = event.target;
    const [mainKey, subKey] = name.split(".");
    setFormData((prevState) => ({ 
        ...prevState,
        [mainKey]: {
            ...prevState[mainKey],
            [subKey]: value,
        },
    }));
};