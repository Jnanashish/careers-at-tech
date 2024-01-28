import React from "react";

const CustomInput = (props) => {
    const { type, value, placeholder, className, name, checked } = props;

    return (
        <>
            {type === "radio" && (
                <input
                    type="radio"
                    className={className}
                    value={value}
                    name={!!name ? name : ""}
                    placeholder={!!placeholder ? placeholder : ""}
                    onChange={(e) => props.event(e.target.value)}
                    checked={checked}
                />
            )}
            {type !== "radio" && (
                <input
                    type={!!type ? type : "text"}
                    className={className}
                    value={value}
                    name={!!name ? name : ""}
                    placeholder={!!placeholder ? placeholder : ""}
                    onChange={(e) => props.event(e.target.value)}
                    onKeyDown = {(e) => !!props.onKeyDown ? props.onKeyDown(e) : {}}
                    class="no-zoom"
                />
            )}
        </>
    );
};

export default CustomInput;
