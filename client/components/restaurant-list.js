import React from 'react'

export const RestaurantList = props => {
  return (
    <div>
      <ul>
        {props.restaurants.map(restaurant => {
          return (
            <li key={restaurant.id} a href={restaurant.url}>
              {restaurant.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
