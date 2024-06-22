import React, { forwardRef } from 'react'

const InputDevice = forwardRef(({ type, placeholder, id, error, onChange, onBlur, name }, ref) => (
    <div className="form-group">
        <label htmlFor={id}>{placeholder}:</label>
        <input
            type={type}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder={placeholder}
            name={name}
            id={id}
            aria-invalid={error ? 'true' : 'false'}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
        />
        {
            error &&
            <span className="error invalid-feedback">{error.message}</span>
        }
    </div>
))

export default InputDevice