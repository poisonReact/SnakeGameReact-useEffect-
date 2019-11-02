import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './infoString.module.css';

const maxLengthCreator = (maxLength) => (value) => 
  value && value.length > maxLength ? `Must be ${maxLength} characters or less` : undefined


const maxLength15 = maxLengthCreator(15)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} autoFocus={true}/>
      {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
    </div>
  </div>
)

const NickNameForm = ({handleSubmit, setNickNameEditFalse, }) => {

    return (
        <form onSubmit={handleSubmit}>
      <div>
      
        <Field 
        name="nickName" 
        type="text"
        component={renderField}
        validate={[maxLength15 ]}
        onBlur={setNickNameEditFalse}
       
         />
      </div>
      
      <div className={styles.nickNameToEdit}>(double click to edit)</div>
    </form>
    ) 
    
  }
  
  const NickNameFormContainer = reduxForm({
    form: 'nickname',
    destroyOnUnmount: false
  })(NickNameForm)
  
  export default NickNameFormContainer