import React, { HTMLProps } from 'react'

const Card = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <div className={`bg-white dark:bg-primary-90 p-space16 rounded-lg text-text500 dark:text-primary-40 ${props.className}`} {...props}>
            {props.children}
        </div>
    )
}

export default Card