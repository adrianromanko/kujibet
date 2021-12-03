// import logo from './logo.png';
import './App.css';
import { create } from './animation/kuji';
import { useEffect, useRef } from 'react';
// import logo from './logo.png'
const animation = create();

function App() {
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rendererRef.current?.appendChild(animation.renderer.domElement);
    animation.start();
  }, []);

  return (
    <div
      ref={rendererRef}
      className="webgl-shell"
      style={{ display: 'flex', width: '100%', height: '100%' }}
    >
 
    </div>
  );
}


export default App;
