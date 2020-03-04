import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  bottom: 0;

  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;

  @media screen and (max-width: 736px) {
    grid-template-columns: 1fr;
  }

  border-color: gray;
  border-top: 10px;
  background-color: white;
`;

export const AudioInfo = styled.div`
  // grid-column: 1/3;
  display: flex;
  justify-content: flex-start;
  height: 64px;

  @media screen and (max-width: 736px) {
    grid-column: 1/3;
  }
`;
export const AudioInfoText = styled.div`
  padding: 8px;
  line-height: 1.5rem;
`;

export const AudioTitle = styled.p`
  font-size: 1.25rem;
`;

export const SourceTitle = styled.p`
  font-size: 0.75rem;
`;

export const ControlButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 736px) {
    grid-column: 1/3;
  }
`;

export const ShareButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 736px) {
    grid-column: 1/3;
  }
`;
