import React from "react";
import PropTypes from "prop-types";

import * as window from "helpers/window";
import * as S from "./styles";

class Tab extends React.Component<any, any> {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    window.scrollTo(0, 0);
    const { label, onClick } = this.props as any;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    return (
      <S.Tab active={activeTab === label} onClick={onClick}>
        {label}
      </S.Tab>
    );
  }
}

export default class Tabs extends React.Component<
  { children: any; onTabPropClick: any },
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: Array.isArray(this.props.children)
        ? this.props.children[0].props.label
        : this.props.children!.props.label,
    };
  }

  onClickTabItem = (tab: any) => {
    this.setState({ activeTab: tab });
    this.props.onTabPropClick(tab);
  };

  render() {
    const singleChild = !Array.isArray(this.props.children);

    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return singleChild ? (
      <S.Container>
        <S.List>
          <Tab
            activeTab={activeTab}
            key={this.props.children!.props.label}
            label={this.props.children!.props.label}
            onClick={onClickTabItem}
          />
        </S.List>
        <S.Content>{this.props.children!.props.children}</S.Content>
      </S.Container>
    ) : (
      <S.Container>
        <S.List>
          {children!.map((child: any) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </S.List>
        <S.Content>
          {children!.map((child: any) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </S.Content>
      </S.Container>
    );
  }
}
