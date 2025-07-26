import React, {useEffect} from 'react';

type SessionTimeoutProps = {
    onTimeout: () => void;
    timeoutDuration?: number;
}

const SessionTimeout: React.FC<SessionTimeoutProps> = ({onTimeout, timeoutDuration = 30000}) => {
    useEffect(()=> {
        let timeoutId: number;

        const resetTimer = ()=> {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(()=>{
                onTimeout();
            }, timeoutDuration);
        }

        const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart'];

        activityEvents.forEach((event)=> window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            clearTimeout(timeoutId);
            activityEvents.forEach((event)=> {
                window.removeEventListener(event, resetTimer)
            });
        }
    }, [onTimeout, timeoutDuration]);

    return null;
}

export default SessionTimeout;