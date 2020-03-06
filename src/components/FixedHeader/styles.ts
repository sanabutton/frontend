import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: white;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.16);
  transition: all ease-in-out 500ms;
  opacity: 0;
`;

export const Title = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: 600;
  color: #ff7f50;
  line-height: 56px;
  margin-left: 24px;
`;

export const Input = styled.input`
  outline: none;
  width: 256px;
  height: 30px;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 18px;
  padding: 0 8px;
  &::placeholder {
    margin-left: 24px;
  }
`;

export const Link = styled.a`
  display: block;
`;
