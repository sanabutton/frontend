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
    padding-bottom: 24px;
  }

  border-top: solid 2px gray;
  background-color: white;
`;

export const AudioInfo = styled.div`
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
  font-size: 1rem;
`;

export const SourceTitle = styled.p`
  font-size: 0.75rem;
`;

export const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 736px) {
    grid-column: 1/3;
  }
`;

export const ControlButton = styled.button`
  font-size: 1.2rem;
  padding: 2px 8px;
`;

export const ShareContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 736px) {
    grid-column: 1/3;
  }
`;

export const ButtonsContainer = styled.div`
  margin-bottom: 8px;
`;
