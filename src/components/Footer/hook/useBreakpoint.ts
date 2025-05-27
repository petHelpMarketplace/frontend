import {useState, useEffect} from 'react';

export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
    const [value, setvalue] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
    useEffect(()=> {
        if (typeof window === 'undefined') return;
        const queries = {
            mobile: window.matchMedia('(max-width: 767px)'),
            tablet: window.matchMedia('(min-width: 768px) and (max-width: 1279px)'),
            desktop: window.matchMedia('(min-width: 1280px)'),
    };

    const getBreakpoint = () => {
        if (queries.desktop.matches) return 'desktop';
        if (queries.tablet.matches) return 'tablet';
        return 'mobile';
    };

    const update = () => setvalue(getBreakpoint());

    Object.values(queries).forEach(q => q.addEventListener('change', update));

    update();

    return () =>
        Object.values(queries).forEach(q => q.removeEventListener('change', update));
}, []);

return value;
}