import styled from "styled-components";

export const EmptyWrapper = styled.div`
    margin: 20px 0;
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;