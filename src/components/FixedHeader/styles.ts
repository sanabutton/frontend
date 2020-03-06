import styled from 'styled-components';

export const Container = styled.div<{ shadow: boolean }>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 56px;
  background-color: white;
  box-shadow: ${(props) => (props.shadow ? '0px 6px 6px 0px rgba(0, 0, 0, 0.16)' : 'none')};
  transition: all ease-in-out 500ms;
  opacity: 0;
  z-index: 999;

  @media screen and (max-width: 736px) {
    display: block;
    text-align: center;
  }
`;

export const Title = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: 600;
  color: #ff7f50;
  line-height: 56px;
  margin-left: 24px;
  @media screen and (max-width: 736px) {
    display: none;
  }
`;

export const Input = styled.input`
  outline: none;
  width: 256px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 18px;
  padding: 0 8px;
  &::placeholder {
    margin-left: 24px;
  }
  margin: calc(calc(56px - 30px) / 2);
  @media screen and (max-width: 736px) {
    margin-bottom: 8px;
  }
`;

export const Link = styled.a`
  display: block;
`;

export const ResultContainer = styled.div<{ in: boolean }>`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.16);
  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => (props.in ? 8 : 0)}px;

  transition: all ease-in-out 800ms;
  opacity: ${(props) => (props.in ? 1 : 0)};
  min-height: ${(props) => (props.in ? 10 : 0)}vh;
  max-height: 20vh;
`;
