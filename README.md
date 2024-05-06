# React-Dynamic-Form-with-json
Este projeto faz parte de um projeto de uma aplicação fullstack que estou construindo, se trata de um formulario que pode ser gerado com um objeto javascript.

# Instalação

Baixe o projeto completo e coloque no seu projeto, verifique o arquivo ```HandleSubmit.jsx```, pois lá voce deve configurar a sua função responsável por fazer requisições, caso seja uma função fora a parte, se não, apenas adicione um método fetch ou use o axios para fazer a requisição e passe a variavel ```req``` como parâmetro da requisição.

# Requerimentos

Precisa do react js.
Eu usei o vite para criar o projeto.
Todos os arquivos estão em ```.jsx```

## Funcionalidades

As principais funcionalidades desse Forms dinâmico é a possibilidade de criar:

__________
### Input textual
Esse Tipo de input é gerado pelo seguinte formato json:

**Exemplo adicionando o campo nome**
```javascript
export const myFields = {
    Nome: {
        label: "Nome Completo",
        type: "text",
        required: true
    }
};
```

___________
### Input numérico
Esse Tipo de input é gerado pelo seguinte formato json:

**Exemplo adicionando o campo Idade**
```javascript
export const myFields = {
    Idade: {
        label: "Idade",
        type: "number"
    }
};
```

Obs: Caso você tire o campo 'required' o input fica opcional.

__________
### Opção de seleção com base em objetos de api
Esse Tipo de input é uma caixa de opções que você pode selecionar algo. Esse input é gerado pelo seguinte formato json:

**Exemplo adicionando o campo de seleção de Profissão**
```javascript
export const myFields = {
    Profissao : {
      label: "Profissão",
      type: "ref",
      required: true,
      uri: "endpoint api",
      fieldA: "Nome",
      fieldB: "Acronimo",
    },
};
```

Nesse exemplo aparece ```FieldA``` e ```FieldB```, ambos se referem ao que vai aparecer na opção.

Objeto da requisição:
```json
Profissoes: {
    {
        Nome: "Administrador de banco de dados",
        Acronimo: "DBA"
    },
    {
        Nome: "Engenheiro de software",
        Acronimo: "BES"
    }
}
```

__________
### Objeto que tenham mais de um campo
Esse Tipo de input é gerado pelo seguinte formato json:

**Exemplo adicionando o campo Endereço**
```javascript
export const myFields = {
    Endereco: {
        label: "Endereço",
        type: "object",
        objects : {
            Rua: {
                label: "Rua",
                type: "text",
            },
            Numero: {
                label: "Número",
                type: "number",
            }
        }
    }
};
```

__________
### Arquivo/imagem
Esse Tipo de input é gerado pelo seguinte formato json:

**Exemplo adicionando o campo para imagem**
```javascript
export const myFields = {
    Foto: {
        label: "Sua foto de perfil",
        type: "file"
    }
};
```

Obs: Na versão atual ele está apenas lidando com imagens e não com qualquer tipo de arquivo. Isso é por conta da finalidade com que eu construi esse forms.

__________



## Uso/Exemplos

```javascript
import React, { useState } from 'react'
import DynamicForms from 'DynamicForm/Form'
import { ToastContainer } from 'react-toastify';
import myFields from 'código com o json'

function App() {
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  //caso onEdit mude para o estado true, editData deve receber os dados do objeto, de um banco de dados por exemplo. 

  return (
    <div>
      <DynamicForms 
        formFields={myFields} 
        onEdit={onEdit} // ativar o modo de edição
        formName={"Teste"} // esse nome vai para o 'for' das labels 
        endpoint={"endpoint da api"} 
        // closeForm={closeModal} //caso use modal
        editData={editData} // Dados que voce quer editar
        refreshData={() => setRefresh(true)} // caso queira fazer uma reqisição na sua tela principal após usar o forms
      />


      //Toast para os elementos do form que usam toast
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  )      
}
```

## Tecnologias usadas

**Front-end:** React, css, axios

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
