import styled from 'styled-components';

export const Container = styled.div`
  margin: 1em 0px;
`;

export const Title = styled.h2`
  display: block;
  font-size: 1.5em;
  font-weight: 600;
  color: #808080;
  margin: 0.8em 0;
`;

export const LogContainer = styled.div`
  margin: 16px 16px 16px 40px;
`;

export const LogContent = styled.div`
  display: flex;
`;

export const Text = styled.p`
  padding: 0;
  margin: 0;
  color: #808080;
  font-weight: 600;
  margin-left: 12px;
  &:last-child {
    margin-left: none;
  }
`;
