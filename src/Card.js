import React from "react";

const Card = (props) =>{
    const {item} = props;

    return (
        <div className="item-card">
            <h1>{item[0]}</h1>
            <p>{item[1].map(item => item.join(" ")).join(", ")}</p>

        </div>
    )
}

export default Card;