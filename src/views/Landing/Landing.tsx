import { LandingHeader } from "./LandingHeader";
import { LandingPools } from "./LandingPools";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";

import * as S from "./styles";

export default function Landing() {
  return (
    <S.Wrapper>
      <LandingHeader />
      <LandingPools />
      <LandingInfo />
      <LandingSteps />
    </S.Wrapper>
  );
}
