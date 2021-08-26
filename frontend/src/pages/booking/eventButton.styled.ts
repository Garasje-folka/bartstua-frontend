import styled from "styled-components";
import { Theme } from "../../app.theme";

type StyledButtonProps = {
  selected: boolean;
};
export const TimeContainer = styled.div`
  flex-grow: 1;
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.BOLD};
  text-align: center;
`;

export const PlacesContainer = styled.div`
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.THIN};
  text-align: end;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.colorPalette.secondary.default
      : theme.colorPalette.primary.light};
  border: none;
  color: ${({ theme, selected }) =>
    selected ? theme.text.color.INVERTED : theme.colorPalette.primary.default};
  border-radius: ${({ theme }: { theme: Theme }) => theme.radius.ROUND};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.2em;
  flex: 1;
  min-width: 160px;
  transition: var(--transition-duration);
  transition-timing-function: ease-in-out;

  --transition-duration: 0.2s;
  ${PlacesContainer}, ${TimeContainer} {
    transition: var(--transition-duration);
  }
  :hover {
    ${PlacesContainer}, ${TimeContainer} {
      transform: scale(1.1);
    }
    background-color: ${({ theme }) => theme.colorPalette.primary.default};
    color: ${({ theme }) => theme.text.color.INVERTED};
  }
`;
