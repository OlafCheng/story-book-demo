import * as React from 'react';

import './tab-select.scss';

interface TabUnitProps {
  onClick?: (value: string) => void;
  handleSwitchTab?: (value: object) => void;
  value: string;
  name: string;
  text: string;
  active?: boolean;
}

const TabUnit = (params: TabUnitProps) => {
  const handleClick = () => {
    const { onClick, value, handleSwitchTab, name } = params;
    if (onClick) {
      onClick(value);
    }
    handleSwitchTab({ value, name })
  }

  const { text, active } = params;
  const actived = `${active ? 'tab-select__tab--active' : ''}`;

  return (
    <span className={`tab-select__tab ${actived}`} onClick={handleClick}>
      {text}
    </span>
  )
}

interface ValueProps {
  value?: string;
  name?: string;
  text?: string;
}

interface TabProps {
  className?: string;
  pairs: ValueProps[];
  title: string;
  name: string;
  value?: string;
  onChange: (value: object) => void;
  cancle?: boolean;
}

interface TabState {
  value: ValueProps;
  init: boolean;
}

export default class TabSelect extends React.Component<TabProps, TabState> {
  static defaultProps: Partial<TabProps> = {
    cancle: true
  }

  state = {
    value: {
      value: this.props.value,
      name: '',
      text: ''
    },
    init: true
  }

  handleSwitchTab = (value: ValueProps): void => {
    const { onChange } = this.props;
    let prevValue: string;
    if (this.state.init) {
      prevValue = this.props.value;
      this.setState({ init: false })
    } else {
      prevValue = this.state.value && this.state.value.value;
    }
    const nextValue = value.value;
    let newValue: object;
    if (prevValue !== nextValue) {
      // 选中了不同项
      newValue = value;
      this.setState({ value: newValue }, () => onChange(newValue));
    } else {
      // 选中了相同项
      if (this.props.cancle) {
        // 重复选中可以取消
        newValue = { name: value.name };
        this.setState({ value: newValue }, () => onChange(newValue));
      }
    }
  };

  render() {
    const { className, pairs, title, name, value: superValue } = this.props;
    const { value: { value: innerValue }, init } = this.state;

    return (
      <div className={`tab-select ${className ? className : null}`}>
        <span className="tab-select__title">{title}</span>
        {
          pairs.map((pair: ValueProps, index: number) => (
            <TabUnit
              value={pair.value}
              text={pair.text}
              key={index}
              name={name}
              handleSwitchTab={this.handleSwitchTab}
              active={innerValue ? innerValue === pair.value : init && (superValue === pair.value)}
            />
          ))
        }
      </div>
    );
  }
}
