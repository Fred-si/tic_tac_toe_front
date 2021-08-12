interface FormProps {
    onClick: () => void
}

interface SVGProps {
    ariaLabel: string
    onClick?: () => void
    children?: JSX.Element | Array<JSX.Element>
}

export function Empty({ onClick }: FormProps) {
    return <SVG onClick={onClick} ariaLabel='empty' />
}

export function Circle() {
    return (
        <SVG ariaLabel='circle'>
            <circle cx='50' cy='50' r='45' />
        </SVG>
    )
}

export function Cross() {
    return (
        <SVG ariaLabel='cross'>
            <line x1='5' y1='5' x2='95' y2='95' />
            <line x1='95' y1='5' x2='5' y2='95' />
        </SVG>
    )
}

function SVG({ ariaLabel, onClick, children }: SVGProps) {
    return (
        <svg
            viewBox='0 0 100 100'
            aria-label={ariaLabel}
            onClick={onClick ?? (() => {})}
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
        >
            {children}
        </svg>
    )
}
