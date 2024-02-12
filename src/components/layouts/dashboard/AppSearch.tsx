import React from 'react'
import { Icon } from '@iconify/react'

const AppSearch = () => {
    return (
        <div className="w-3/4 h-[4.4rem] relative hidden sm:block">
            <input
                id={'search'}
                type="search"
                placeholder='search..'
                className={` border border-primary-20 rounded-lg px-3 pl-[3.4rem] text-primary-400 placeholder:text-primary-200 placeholder:!text-md !text-md py-[.5rem] h-full w-full focus:outline-none focus:border-primary-400 peer`}
                autoComplete="off"
            />
            <label
                htmlFor={'search'}
                className="absolute text-sm text-black transform -translate-y-1/2 top-1/2 left-[1rem] text-primary-200"
            >
                <Icon icon="carbon:search" />
            </label>
        </div>
    )
}

export default AppSearch