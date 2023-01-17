import React from 'react';

 const  FormError = (props) => {
  return (
    <span className="field-validation-error text-danger" data-valmsg-for="RePassword" data-valmsg-replace="true"> {props.errorMessage}</span>
    
  )
};

export default FormError;