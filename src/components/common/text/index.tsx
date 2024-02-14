import React, { HTMLProps } from 'react';

const PageTitle = (props: HTMLProps<HTMLParagraphElement>) => {
    return (
        <p className={`text-xl font-bold text-text500 dark:text-primary-40 ${props.className}`} {...props}>
            {props.children || props.title}
        </p>
    )
}
const PageSubTitle = (props: HTMLProps<HTMLParagraphElement>) => {
    return (
        <p className={`text-lg font-bold text-text400 dark:text-primary-60 ${props.className}`} {...props}>
            {props.children || props.title}
        </p>
    )
}

const Text = (props: HTMLProps<HTMLParagraphElement> & { type: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' }) => {
    const textColorTheme = () => {
        if (props.type === 'primary') {
            return 'text-text500 dark:text-primary-40'
        } else if (props.type === 'secondary') {
            return 'text-text400 dark:text-primary-60'
        } else if (props.type === 'muted') {
            return 'text-text300 dark:text-primary-70'
        } else if (props.type === 'error') {
            return 'text-error-100'
        } else if (props.type === 'success') {
            return 'text-success-100'
        } else if (props.type === 'warning') {
            return 'text-warning-100'
        }
    }
    return (
        <p className={`text-sm  ${textColorTheme()} ${props.className}`} {...props}>
            {props.children || props.title}
        </p>
    )
}

export { PageTitle, PageSubTitle, Text }
