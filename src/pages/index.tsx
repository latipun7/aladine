import bigImg from 'assets/test-img.jpg';
import tinyImg from 'assets/test-img-tiny.png';
import type { VFC } from 'react';

const Index: VFC = () => {
  return (
    <>
      <img
        src={bigImg.src}
        srcSet={bigImg.srcSet}
        sizes="
          (min-width: 720px) calc(100vw - 344px), (min-width: 520px) calc(100vw - 96px), calc(100vw - 32px)
        "
        alt="big responsive"
      />
      <img src={tinyImg.toString()} alt="small responsive" />
      <div>Test apps.</div>
    </>
  );
};

export default Index;
