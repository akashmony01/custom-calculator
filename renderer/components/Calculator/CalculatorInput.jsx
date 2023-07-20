import React from "react"

export default function CalculatorInput({
    name,
    inputLabel,
    placeholder = "",
    value = "",
    className = "",
    onChangeHandler,
    isTextArea = false,
}) {
    const Tag = isTextArea ? "textarea" : "input";

    return (
        <div className={`block ${className}`}>
            <label htmlFor={name} className="inline-block cursor-pointer mb-2">
                {inputLabel}
            </label>

            <Tag
                id={name}
                name={name}
                className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                type="text"
                {...(isTextArea ? { rows: 5 } : {})}
                defaultValue={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
            ></Tag>
        </div>
    )
}
