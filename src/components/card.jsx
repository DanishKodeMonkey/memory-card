import React from 'react';

export default function Card({ imageUrl }) {
    return (
        <div className='card'>
            <img
                src={imageUrl}
                alt='Cat'
            />
        </div>
    );
}
