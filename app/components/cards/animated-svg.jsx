// app/components/cards/animated-svg.jsx
import { useEffect, useRef } from 'react';
import myAnimation from '~/assets/myAnimation.svg';


export function AnimatedSvg() {
    const svgRef = useRef(null);

    useEffect(() => {
        const svgElement = svgRef.current;
        if (svgElement) {
            const elementToAnimate = svgElement.getElementById('animatedElementId'); // Ajustez l'ID
            if (elementToAnimate) {
                let angle = 0;
                const rotate = () => {
                    angle = (angle + 1) % 360;
                    elementToAnimate.setAttribute('transform', `rotate(${angle})`);
                    requestAnimationFrame(rotate);
                };
                rotate();
            }
        }
    }, []);

    return (
        <div>
            <img ref={svgRef} src={myAnimation} alt="Project animation" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}

export default AnimatedSvg;
