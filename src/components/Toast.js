import React, { useEffect,useState } from 'react';
import '../css/main.css';

const Toast = ({ message, onClose, cl }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 1000);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${cl} ${visible ? 'fade-in' : 'fade-out'}`}>
            {message}
        </div>
    );
};

export default Toast;