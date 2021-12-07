import { useEffect, useRef } from 'react';

// import graphic from 'images/graphic.svg';
// import breakSvg from 'images/break.svg';
// import solanaSvg from 'images/solana.svg';
import { Link } from 'react-router-dom';
import { create } from '../animation/kuji';

const animation = create();

export const HomePage = () => {
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rendererRef.current?.appendChild(animation.renderer.domElement);
    animation.start();
  }, []);

  return (
    <div
      ref={rendererRef}
      className="webgl-shell"
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Link
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 22
        }}
        className="btn btn-pink px-6 py-3 mb-5 text-uppercase"
        to="/game"
      >
        Play
      </Link>
    </div>
  );
};
