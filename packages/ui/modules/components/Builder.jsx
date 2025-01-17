import { Utils } from "@react-awesome-query-builder/core";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "./item/Item";
import SortableContainer from "./containers/SortableContainer";
import {pureShouldComponentUpdate} from "../utils/reactUtils";
const { getTotalReordableNodesCountInTree, getTotalRulesCountInTree } = Utils.TreeUtils;
const { createListFromArray, emptyProperties } = Utils.DefaultUtils;

class Builder extends Component {
  static propTypes = {
    tree: PropTypes.any.isRequired, //instanceOf(Immutable.Map)
    config: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    onDragStart: PropTypes.func,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const should = this.pureShouldComponentUpdate(nextProps, nextState);
    return should;
  }

  constructor(props) {
    super(props);
    this.pureShouldComponentUpdate = pureShouldComponentUpdate(this);

    this._updPath(props);
  }

  _updPath (props) {
    const id = props.tree.get("id");
    this.path = createListFromArray([id]);
  }

  render() {
    const {
      tree, config, actions, onDragStart,
    } = this.props;
    const rootType = tree.get("type");
    const isTernary = rootType == "switch_group";
    const reordableNodesCnt = isTernary ? null : getTotalReordableNodesCountInTree(tree);
    const totalRulesCnt = isTernary ? null : getTotalRulesCountInTree(tree);
    const id = tree.get("id");
    return (
      <Item 
        key={id}
        id={id}
        path={this.path}
        type={rootType}
        properties={tree.get("properties") || emptyProperties()}
        config={config}
        actions={actions}
        children1={tree.get("children1") || emptyProperties()}
        reordableNodesCnt={reordableNodesCnt}
        totalRulesCnt={totalRulesCnt}
        parentReordableNodesCnt={0}
        onDragStart={onDragStart}
      />
    );
  }
}

export default SortableContainer(Builder);
