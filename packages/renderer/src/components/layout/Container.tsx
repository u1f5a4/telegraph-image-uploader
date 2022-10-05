import styled from "@emotion/styled";

export const Container = styled.div<{ size?: string }>`
  padding-left: 16px;
  padding-right: 16px;
  width: ${(props) => props.size};
  margin-left: auto;
  margin-right: auto;
`;
