import React from 'react';

const divStyle = {
  marginBottom: '20px',
  padding: '10px',
  border: '1px solid gray',
  textAlign: 'left',
};

const imgStyle = {
  width: '100%',
  textAlign: 'center',
};

const RecipeCard = (props) => {
  return (
    <div style={divStyle}>
      <div>{props.title}</div>
      <img src={props.image} style={imgStyle} alt={`img${props.id}`} />
    </div>
  );
};

export default RecipeCard;
