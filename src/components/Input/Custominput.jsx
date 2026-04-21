import React from "react";

const CustomInput = (props) => {
    const { type, value, placeholder, className, name, checked } = props;

    return (
        <>  
            {/* fot input type of radio  */}
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
            {/* for normal inputs  */}
            {type !== "radio" && (
                <input
                    type={!!type ? type : "text"}
                    className={className}
                    value={value}
                    name={!!name ? name : ""}
                    placeholder={!!placeholder ? placeholder : ""}
                    onChange={(e) => props.event(e.target.value)}
                    onKeyDown={(e) => (!!props.onKeyDown ? props.onKeyDown(e) : {})}
                />
            )}
        </>
    );
};

export default CustomInput;
