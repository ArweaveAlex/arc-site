export interface PoolArweaveProps {
  id: string;
  state: State;
}

export interface State {
  title: string;
  useOfProceeds: string;
  link: string;
  owner: string;
  contributors: { [key: string]: string };
  tokens: { [key: string]: string };
  totalContributions: string;
  totalSupply: string;
}