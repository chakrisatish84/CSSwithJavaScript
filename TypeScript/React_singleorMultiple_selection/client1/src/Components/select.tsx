import React, { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'
export type SelectOption = {
    label: string,
    value: string | number
}

type singleSelectProps = {
    multiple?: false
    value: SelectOption | undefined
    onChange: (option: SelectOption | undefined) => void
}

type multiSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (options: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & (singleSelectProps | multiSelectProps)

export function Select({ multiple, value, options, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0);
        }
    }, [isOpen])

    const onCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        multiple ? onChange([]) : onChange(undefined);
    }

    useEffect(() => {
        const handelKeyEvents = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.key) {
                case "Enter":
                case "Space":
                    setIsOpen(prevState => !prevState);
                    if (isOpen)
                        changeOption(options[highlightedIndex])
                    break;

                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        setHighlightedIndex(0);
                        break;
                    }
                    const index = highlightedIndex + (e.key == "ArrowUp" ? -1 : 1);
                    if (index >= 0 && index < options.length) {
                        setHighlightedIndex(index);
                    }
                    break;
                }
                case "Escape": {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }
            }
        }
        containerRef.current?.addEventListener("keydown", handelKeyEvents);

        return () => {
            containerRef.current?.removeEventListener("keydown", handelKeyEvents);
        };

    }, [isOpen, highlightedIndex, options])

    const changeOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter((selectedOption) => {
                    return selectedOption != option;
                }))
            }

            else {
                onChange([...value, option])
            }
        } else onChange(option);
    }

    const onSelectedOption = (option: SelectOption) => {
        if (multiple) {
            return value.includes(option);
        }
        return value === option
    }

    const optionButtonClick = (e: React.MouseEvent<HTMLButtonElement>, option: SelectOption) => {
        e.stopPropagation()
        if (multiple) {
            onChange(value.filter((selectedOption: SelectOption) => {
                return selectedOption != option
            }))
        }
    }

    const renderMulipleValues = (): React.ReactNode => {
        return (
            <>
                {multiple &&
                    (value?.map((option: SelectOption, index: number) => {
                        return <button onClick={(e) => optionButtonClick(e, option)} key={index} type='button' className={styles["option-badge"]}>
                            {option.label}
                            <span tabIndex={0} className={styles.optionRemoveButton}>&times;</span>
                        </button>
                    }))}
            </>
        )
    }
    return (
        <div ref={containerRef} tabIndex={0} onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)} className={styles.container}>
            <span className={styles.value}>{multiple ? renderMulipleValues() : value?.label}</span>
            <button onClick={(e) => { onCloseButtonClick(e) }} className={styles["close-btn"]} type="button">&times;</button>
            <div className={styles.separator}></div>
            <div className={styles.carrot}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option: SelectOption, index: number) => {
                    return (
                        <li key={index} onMouseEnter={() => setHighlightedIndex(index)} onClick={(e) => { e.stopPropagation(); changeOption(option) }}
                            className={`${styles.option} ${onSelectedOption(option) ? styles.selected : ""} ${highlightedIndex === index ? styles.highlighted : ""}`}>
                            {option.label}
                        </li>)
                })}
            </ul>
        </div>
    )
}