import './product.less';

import { Outlet } from 'react-router-dom';
import React from 'react';

export default function Product() {
    return (
        <div>
            <Outlet />
        </div>
    )
}
