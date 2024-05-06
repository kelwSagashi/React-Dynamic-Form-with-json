import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export const Label = ({label, htmlFor}) => {
    return (
      <label className={'form-label'} htmlFor={htmlFor}>{label}</label>
    )
}
  
export const Input = ({required, type, field, value, handleChange}) => {
    return (
      <input placeholder={(required ? "Obrigatório" : "Opcional")} type={type} name={field} id={field} value={value} onChange={handleChange} className={"form-input"} />
    )
}
  
export const Option = ({selectObject, object, field, handleChange, value}) => {
    return (
      <option value={value} key={value} className='form-option' id={field} name={field} onChange={handleChange}>
        {`${selectObject[object.fieldA]} ${selectObject[object.fieldB]}`}
      </option>
    )
}


export const CreateInputField = ({object, field, value, handleChange, setFormData, className}) => {
    return (
      <div className={(className ? className : "") + 'form-field'}>
        <Label label={object.label} htmlFor={field}/>
        <Input required={object.required} type={object.type} field={field} value={value} handleChange={(e) => {setFormData ? handleChange(e, setFormData) : handleChange}} />
      </div>
    );
};

export const CreateFileInputField = ({object, field, value, formData, handleChange, file, setFile, onEdit, className}) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };

    useEffect(() => {
      if (file){
        formData ? 
          handleChange(field, file, formData) :
          handleChange(field, file);   
      }    
    }, [field, file]);

    return (
      <div className={(className ? className : "") + 'form-field'}>
        <Label label={object.label} htmlFor={field}/>
        <label className="form-file-drop-container" id="formfiledropcontainer" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
            <span className="form-file-drop-title">Selecione ou jogue o arquivo aqui</span>
            <span>Arquivo selecionado:        
                {file &&
                  <span>
                    <FontAwesomeIcon icon={faImage}/>      
                    <h4>{(typeof file === 'string') ? file : file.name}</h4>
                  </span>
                }
            </span>
            <input hidden className='form-file-input' type="file" name={field} id={field} /*value={value}*/ onChange={handleFileChange} accept="image/*"/>
        </label>
      </div>
    );
};

export const CreateNestedInputField = ({object, formData, mainKey, className, handleChange, setFormData}) => {
    const [isExpanded, setIsExpanded] = useState(true);
  
    const handleExpand = () => {
      setIsExpanded(!isExpanded);
    };
    
    const subitens = Object.keys(formData).map((key) => {
      return (
        <CreateInputField 
            object={object.objects[key]} 
            field={`${mainKey}.${key}`} 
            value={formData[key]} 
            handleChange={handleChange} 
            className={className} 
            key={key}
            setFormData={setFormData}
        />
      )
    });
  
    return (
      <div className='especial-form-field' >
        <div className='form-expand-button' onClick={handleExpand}>
          <div className={(isExpanded) ? "form-arrow active" : "form-arrow"}>{">"}</div>
          <div>{object.label}</div>
          <div className={(isExpanded) ? 'form-hellip active' : 'form-hellip'}>&hellip;</div>
        </div>
        <div className='sub-form-field'>
          {isExpanded && subitens}
        </div>
      </div>
    );
};

export const SelectionBox = ({object, field, value, handleChange, onEdit, setFormData}) => {
    const [selectObjects, setSelectObjects] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
      if (onEdit){
        setSelectedId(value);
        const event = {target: {name: value}}

        setFormData ?
          handleChange(event, setFormData) :
          handleChange(event);
      }
    }, [onEdit, value])
  
    useEffect(() =>{
      const getObjs = async () => {
        try {
          const res = await axios.get(object.uri);
          setSelectObjects(res.data);
        } catch (error){
          toast.error(error);
        }
      }
    
      getObjs();
    }, [setSelectObjects]);
  
    const handleChangeSelection = (event) => {
      const selectedValue = event.target.value;
      setSelectedId(selectedValue);
      setFormData ?
          handleChange(event, setFormData) :
          handleChange(event);
    };
  
    const options = Object.keys(selectObjects).map((key) => (
      <Option
        key={key}
        selectObject={selectObjects[key]}
        object={object}
        value={selectObjects[key]._id}
        onSelect={handleChangeSelection}
        field={field}
      />
    ));
  
    return (
      <div className={'form-field'}>
        <Label label={object.label} htmlFor={field}/>
        <select 
            id={field}
            name={field} 
            value={selectedId}
            onChange={handleChangeSelection}  
            className={'form-input'}
        >
            <option value="">{"Selecione um(a) " + object.label}</option>
          {options}
        </select>
      </div>
    )
};

export function getKeys(object) {
    const _keys = Object.keys(object);
    
    const keyTypeObject = [];
    keyTypeObject.push(_keys);
    
    _keys.map((key) => {
        if (object[key].type === "object"){
            keyTypeObject.push(Object.keys(object[key].objects));
        }
    });

    const keys = keyTypeObject.reduce((acc, array) => acc.concat(array), []);

    const _formData = Object.fromEntries( keys.map((key) => [key, ""] ) );
    
    return _formData;
}