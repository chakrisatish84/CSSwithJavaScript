import React, { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'

export type SelectOption = {
    label: string
    value: string | number
}

type singleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (option: SelectOption | undefined) => void
}

type multiSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (option: SelectOption[]) => void
}


type SelectProps = {
    options: SelectOption[]
} & (singleSelectProps | multiSelectProps)

export function Select({ multiple, value, options, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highLightedIndex, setHighLightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null)

    const onCloseButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        { multiple ? onChange([]) : onChange(undefined) };
    }

    const changeOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o != option))
            } else {
                onChange([...value, option])
            }
        }

        else {
            if (option != value) {
                onChange(option);
            }
        }
    }

    const isOptionSelected = (option: SelectOption): boolean => {
        return multiple ? value?.includes(option) : option == value
    }

    const multipleContent = (value: SelectOption[]): React.ReactNode => {
        const onRemoveButtonClick = (e: React.MouseEvent<HTMLElement>, option: SelectOption) => {
            e.stopPropagation();
            changeOption(option)
        }
        return (
            <>
                {value.map((v: SelectOption, index: number) => {
                    return (
                        <button type='button' key={index} onClick={(e) => onRemoveButtonClick(e, v)} className={styles["options-badge"]}>
                            {v.label}
                            <span className={styles["remove-btn"]}>&times;</span>
                        </button>
                    )
                })}
            </>
        )

    }

    useEffect(() => { if (isOpen) { setHighLightedIndex(0) } }, [isOpen])


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return;

            switch (e.code) {
                case "Enter":
                case "NumpadEnter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen)
                        changeOption(options[highLightedIndex])
                    break;

                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue = highLightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighLightedIndex(newValue)
                    }
                    break;
                }
                case "Escape":
                    if (isOpen) {
                        setIsOpen(false)
                    }
                    break;
            }
        }
        containerRef.current?.addEventListener("keydown", handleKeyDown)

        return () => { containerRef.current?.addEventListener("keydown", handleKeyDown) }
    }, [isOpen, highLightedIndex, options])

    return (
        <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{multiple ? multipleContent(value) : value?.label}</span>
            <button type="button" onClick={onCloseButtonClick} className={styles["close_button"]}>&times;</button>
            <div className={styles.separator}></div>
            <div className={styles.carrot}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map((option: SelectOption, index: number) => {
                    return (
                        <li onMouseEnter={() => setHighLightedIndex(index)} onClick={(e) => { e.stopPropagation(); changeOption(option) }} key={index}
                            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highLightedIndex ? styles.highlighted : ""}`}>
                            {option.label}
                        </li>)
                })}
            </ul>
        </div>
    )
}






