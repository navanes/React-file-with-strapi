import React from 'react';
//import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
    query GetReviews {
      reviews {
        data {
          id
          attributes{
            title, 
            body,
            rating,
            categories {
              data {
                id,
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
`

function HomePage() {
    //const { data, error, loading } = useFetch('http://localhost:1337/api/reviews')
    const { data, error, loading } = useQuery(REVIEWS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>

    return (
        <div>
            {data.reviews.data.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.attributes.rating}</div>
                    <h2>{review.attributes.title}</h2>
                    {review.attributes.categories.data.map( c => (
                        <small key={c.id}>{c.attributes.name}</small>
                    ))}
                    <p>{review.attributes.body.substring(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    );
}

export default HomePage;