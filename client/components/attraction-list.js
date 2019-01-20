import React from 'react'

export const AttractionList = props => {
  return (
    <div>
      <ul>
        {props.attractions.map(attraction => {
          return <li key={attraction.id}>{attraction.title}</li>
        })}
      </ul>
    </div>
  )
}
