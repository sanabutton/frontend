import styled from 'styled-components';

export const Container = styled.div`
  margin: 48px 0px;
`;

export const Title = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: 600;
  color: #ff7f50;
  text-align: center;
  margin-bottom: 48px;
`;

export const ThankNatori = styled.p`
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 24px;
`;

export const HommageContainer = styled.div`
  text-align: center;
`;

export const Text = styled.p<{ color?: string }>`
  font-weight: 600;
  margin: 0;
  padding: 1px;
  background-color: ${(props) => props.color || 'white'};
`;
