import { useRef, useEffect, CSSProperties } from 'react';

// Shared scroll manager for batching parallax updates
class ParallaxScrollManager {
  private layers = new Set<{ element: HTMLDivElement; speed: number }>();
  private rafId: number | null = null;
  private isListening = false;

  addLayer(element: HTMLDivElement, speed: number) {
    this.layers.add({ element, speed });
    if (!this.isListening) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isListening = true;
      this.update();
    }
  }

  removeLayer(element: HTMLDivElement) {
    const layersArray = Array.from(this.layers);
    for (const layer of layersArray) {
      if (layer.element === element) {
        this.layers.delete(layer);
        break;
      }
    }
    if (this.layers.size === 0 && this.isListening) {
      window.removeEventListener('scroll', this.handleScroll);
      this.isListening = false;
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  private handleScroll = () => {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.update();
        this.rafId = null;
      });
    }
  };

  private update() {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const layersArray = Array.from(this.layers);

    for (const { element, speed } of layersArray) {
      const rect = element.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const elementTop = rect.top + scrolled;
        const yPos = (scrolled - elementTop) * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    }
  }
}

const scrollManager = new ParallaxScrollManager();

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export function ParallaxLayer({ children, speed = 0.5, className = "", style = {} }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layerRef.current;
    if (!element) return;

    scrollManager.addLayer(element, speed);

    return () => {
      if (element) {
        element.style.transform = '';
        scrollManager.removeLayer(element);
      }
    };
  }, [speed]);

  return (
    <div
      ref={layerRef}
      className={className}
      style={{
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}

export function FloatingElement({ children, className = "", delay = 0, amplitude = 20 }: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now() + delay;

    const animate = () => {
      if (!elementRef.current) return;

      const elapsed = Date.now() - startTime;
      const y = Math.sin(elapsed / 1000) * amplitude;
      const x = Math.cos(elapsed / 1500) * (amplitude / 2);
      
      elementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (elementRef.current) {
        elementRef.current.style.transform = '';
      }
    };
  }, [delay, amplitude]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
