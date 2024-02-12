import React from 'react'
import { IMenuOpenProps } from '.'

const AsideBar = ({ menuOpen, setMenuOpen }: IMenuOpenProps) => {
    return (
        <aside className={`bg-green-500 h-screen fixed ${menuOpen ? 'w-[30rem] xl:w-[34.4rem] left-0' : '-left-[30rem] xl:left-0 w-[30rem] xl:w-[8rem]'} duration-500 z-50`}>
            <li onClick={() => setMenuOpen(prv => !prv)}>Aside</li>
        </aside>
    )
}

export default AsideBar