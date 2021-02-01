import { useEffect, useState } from "react";

const prefix = "WhatAPP-Clone-";
export const useLocalStorage = <T>(key: string, initialValue?: Function | string | T[]) => {
    const prefixedKey = prefix + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            return JSON.parse(jsonValue);
        }
        if (initialValue && typeof initialValue === "function") {
            return initialValue();
        }
        else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [value, prefixedKey])

    return [value, setValue]

}