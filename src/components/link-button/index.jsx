import React from 'react';

import './index.less';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function LinkButton({ children, onClick, className = '', ...restProps }) {

    return (
        <button
            type='button'
            className={`link-button ${className}`}
            onClick={onClick}
            {...restProps}>
            {children}
        </button>
    )
}
