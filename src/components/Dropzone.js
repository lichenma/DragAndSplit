import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Dropzone = ({ isDropDisabled, balance, items, id }) => (
  <div className="column col-3">
    <div className="divider" data-content={id.toUpperCase()} />
    <h3>{balance}</h3>
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu item-list" {...provided.droppableProps} ref={provided.innerRef}>
            {items.map(({ name, cost }, index) => (
              <Item key={name} name={name} index={index} cost={cost}/>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
);

const Item = ({ name, index, cost }) => (
  <Draggable key={name} draggableId={name} index={index} cost={cost}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <figure style={{ backgroundColor: 'transparent' }} className="avatar tile-icon">
            <img src={`./hero_icons/${name.toLowerCase().replace(' ', '-')}.svg`} alt={name} />
          </figure>
          <div className="tile-content">{name}</div>
          <div className="title-content">{cost}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;
