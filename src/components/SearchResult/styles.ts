import styled from 'styled-components';

export const Container = styled.div<{ in: boolean }>`
  position: fixed;
  top: 56px;
  left: 0px;
  z-index: 999;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.16);
  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  padding: 8px;

  transition: all ease-in-out 800ms;
  opacity: ${(props) => (props.in ? 1 : 0)};
  max-height: ${(props) => (props.in ? 300 : 0)}px;
`;
