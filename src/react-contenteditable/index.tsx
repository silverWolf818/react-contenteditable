import {FormEvent, forwardRef, HTMLAttributes, memo, MutableRefObject, useEffect, useRef} from 'react'

type ContenteditableProps = {
    value: string
    onChange: (event: FormEvent<HTMLDivElement>) => void
    valueChange?: boolean
    className?: string
    disabled?: boolean
    prevValue: MutableRefObject<string>
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const replaceCaret = (el: HTMLElement) => {
    const target = document.createTextNode('');
    el.appendChild(target);
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        const sel = window.getSelection();
        if (sel !== null) {
            const range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (el instanceof HTMLElement) el.focus();
    }
}

const Contenteditable = forwardRef<HTMLDivElement, ContenteditableProps>((props: ContenteditableProps, ref) => {
    const {value, onChange, onKeyUp, onKeyDown, disabled, className, prevValue, ...rest} = props

    useEffect(() => {
        const element = typeof ref === 'function' ? null : ref?.current
        if (!element) return
        if (value !== element.innerHTML) {
            element.innerHTML = value
        }
        prevValue.current = value
        replaceCaret(element)
    }, [ref, disabled, className, value, prevValue])

    const handleChange = (event: FormEvent<HTMLDivElement>) => {
        const currentValue = event.currentTarget.innerHTML
        if (currentValue !== prevValue.current) {
            onChange(event)
        }
        prevValue.current = value
    }

    return <div {...rest} className={className} ref={ref} contentEditable={!disabled}
                dangerouslySetInnerHTML={{__html: value}}
                onInput={handleChange}
                onKeyUp={onKeyUp || handleChange} onKeyDown={onKeyDown || handleChange}/>
})

const MemoContenteditable = memo(Contenteditable, (prevProps, nextProps) => prevProps.disabled === nextProps.disabled && prevProps.className === nextProps.className)

const ContenteditableContainer = (props: Omit<ContenteditableProps, 'prevValue'>) => {
    const {value} = props
    const prevValue = useRef<string>(value)
    const element = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (element.current && value !== element.current.innerHTML) {
            element.current.innerHTML = value
            prevValue.current = value
        }
    }, [value])


    return <MemoContenteditable {...props} ref={element} prevValue={prevValue}/>
}

export default ContenteditableContainer