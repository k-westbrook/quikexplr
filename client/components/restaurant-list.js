import React from 'react'

export const RestaurantList = props => {
  return (
    <div>
      <ul>
        {props.restaurants.map(restaurant => {
          return (
            <div key={restaurant.id}>
              <a href={restaurant.url}>
                <li>{restaurant.name}</li>
              </a>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
