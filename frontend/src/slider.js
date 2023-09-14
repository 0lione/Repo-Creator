import React, { useState } from 'react';
import './slider.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Slider({ slideCompleted, setSlideCompleted }) {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const slider = sliderRef.current;
                const rect = slider.getBoundingClientRect();
                const positionX = e.clientX - rect.left;
                const sliderWidth = rect.width;
                const maxSliderValue = slider.max;

                const percentage = (positionX / sliderWidth) * 100;
                const value = (percentage * maxSliderValue) / 100;

                slider.value = value.toFixed(0);
                const slideCompleted = slider.value === slider.max;
                setSlideCompleted(slideCompleted);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, setSlideCompleted]);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        if (slideCompleted) {
            setShowPopup(true);
            const timeout = setTimeout(() => {
                setShowPopup(false);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setShowPopup(false);
        }
    }, [slideCompleted]);

    return (
        <div className="slider-container">
            <div className={`popup-message ${showPopup ? 'show' : ''}`}>
                <div className="popup-content">Repo Private!</div>
            </div>
            <input
                type="range"
                className={`slider ${slideCompleted ? 'completed' : ''}`}
                min="0"
                max="100"
                step="1"
                defaultValue="0"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}
export default Slider;


