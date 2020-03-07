import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px 0px 56px;
`;

export const TitleContainer = styled.div`
  height: 56px;
  width: 100%;
  background: white;
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Title = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: 600;
  color: #ff7f50;
  text-align: center;
  margin-bottom: 48px;
  line-height: 56px;
`;

export const ThankNatori = styled.p`
  margin-top: 56px;
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 24px;
  line-height: 24px;
`;

export const HommageContainer = styled.div`
  text-align: center;
`;

export const Text = styled.p<{ color?: string }>`
  font-weight: 600;
  margin: 0;
  padding: 0.2em;
  line-height: 1.3em;
  background-color: ${(props) => props.color || 'white'};
`;
