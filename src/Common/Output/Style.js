import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled("div")`
  position: relative;
  height: auto;
  width: 100%;
  display: flex;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
  > .canvas-container{
    > .upper-canvas{
      display: none;
    }
  }
`;

export const OutputCanvas = styled('div')`
transform: scale(${props => props.scaledown ? 0.48 : 0.8}) translateX(${props => props.scaledown ? '-55%' : '-5%'}) translateY(${props => props.scaledown ? '-5rem' : ''});
> .canvas-container{
  > .upper-canvas{
    display: none;
  }
}
`;

const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  right: 0;

  &.sign {
    z-index: 3;
  }

  &.bg {
    z-index: 2;
    background: #eee;
  }
`;

export { Wrapper, Canvas, Main };
