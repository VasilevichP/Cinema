import React, { useEffect } from 'react';
import '../css/main.css';

const Toast = ({ message, onClose, cl }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1800);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={cl} >
            {message}
        </div>
    );
};

export default Toast;