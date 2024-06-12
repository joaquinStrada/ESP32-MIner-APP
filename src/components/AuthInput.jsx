import React, { forwardRef } from 'react'

const AuthInput = forwardRef(({ type, placeholder, icon, error, onChange, onBlur, name }, ref) => (
        <div className="mb-3">
            <div className="input-group">
                <input
                    type={type}
                    className="form-control"
                    placeholder={placeholder}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <span className={icon} />
                    </div>
                </div>
            </div>
            {error && (<p style={{
                display: 'block',
                fontSize: '18px',
                color: '#f00',
                margin: '1px 5px 0px 0px'
            }}>{error.message}</p>)}
        </div>
    )
)

export default AuthInput