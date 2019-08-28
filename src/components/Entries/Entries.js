import React, { Component } from "react";
import styled from "styled-components";
import { Header, Button } from "semantic-ui-react";
import { getAllAreasOfOperation, editAreaOfOperation } from "../../api/index";
import EntryTable from "../EntryTable/EntryTable";

export default class Entries extends Component {
  state = { editing: false };
  async componentDidMount() {
    const results = await getAllAreasOfOperation();
    const areasOfOperation = results.area_of_operation.sort(
      (a, b) => parseFloat(a.order) - parseFloat(b.order)
    );
    this.setState({ areasOfOperation });
  }

  updateAOOHandler = ({ id, order, numeral, name }) => {
    editAreaOfOperation({ id, order, numeral, name });
  };

  editHandler = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  render() {
    const { areasOfOperation, editing } = this.state;

    return (
      <Container>
        <Header as="h3">Current Areas Of Operation</Header>
        {areasOfOperation && (
          <EntryTable
            areasOfOperation={areasOfOperation}
            editing={editing}
            updateAOOHandler={this.updateAOOHandler}
            editHandler={this.editHandler}
          />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;
