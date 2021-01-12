import React from 'react';

export function CosmeticCard(props) {
    return (
        <div className='cosmeticCard'>
            <div className='name'>{props.name}</div>
            <div className='img_wrap'>
                <img src={props.picture}/>
            </div>
            <div className='tags'>{props.tags.join(", ")}</div>
            <div className='footer'>
                <span>${props.price}</span>
                {props.isActive === "true" ? (<span className='btn_buy'>BUY</span>) : (<span className='soldout'>SOLD OUT</span>)}
            </div>
        </div>
    )
}
