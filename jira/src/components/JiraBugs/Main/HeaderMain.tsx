import React from 'react'
import { NavLink } from 'react-router-dom'
interface PjTitle {
    titlePj1?: string[]
}
const HeaderMain = ({ titlePj1 = [] }: PjTitle) => {
    

    return (
        <div>
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <NavLink className="breadcrumb-item" style={{textDecoration:"none"}} to="/projectmamagement">Project management</NavLink>
                        <li className="breadcrumb-item active" aria-current="page">
                            {titlePj1}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default HeaderMain