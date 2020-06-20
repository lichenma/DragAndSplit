import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { ITEMS, ROOMMATES } from './custom/data';
import { shuffle, move, sum } from './custom/utils';

import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Footer from './components/Footer';

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of items
  bench: shuffle(ITEMS),
  [ROOMMATES.JOANNA]: [],
  [ROOMMATES.LI]: [],
  [ROOMMATES.KAIZEN]: [],
  balance: {
    bench: sum(ITEMS),
    [ROOMMATES.LI]: 0,
    [ROOMMATES.JOANNA]: 0, 
    [ROOMMATES.KAIZEN]: 0,
  }
};

class App extends React.Component {
  state = initialState;

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  render() {
    const { bench } = this.state;
    const isDropDisabled = false;

    return (
      <>
        <Header endGame={this.endGame} />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <div className="columns">
                <Dropzone 
                  id="bench" 
                  items={bench} 
                  balance={this.state.balance["bench"]}
                  isDropDisabled={isDropDisabled} 
                />
                <Dropzone
                  id={ROOMMATES.LI}
                  items={this.state[ROOMMATES.LI]}
                  balance={this.state.balance[ROOMMATES.LI]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={ROOMMATES.JOANNA}
                  items={this.state[ROOMMATES.JOANNA]}
                  balance={this.state.balance[ROOMMATES.JOANNA]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={ROOMMATES.KAIZEN}
                  items={this.state[ROOMMATES.KAIZEN]}
                  balance={this.state.balance[ROOMMATES.KAIZEN]}
                  isDropDisabled={isDropDisabled}
                />
              </div>
            </div>
          </DragDropContext>
        <Footer />
      </>
    );
  }

  componentWillUnmount() {
  }
}

export default App;
