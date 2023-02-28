import React from 'react';
import {Link, useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
//import useFetch from "../hooks/useFetch";

const REVIEW = gql`
 query GetReview($id: ID!) {
      review(id: $id) {
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

function ReviewDetails() {
    const { id } = useParams()
    const { loading, data, error } = useQuery(REVIEW,{
        variables: { id: id }
    });

    //const { loading, data, error } = useFetch('http://localhost:1337/api/reviews/' + id)

    if(loading) return <p>loading...</p>
    if(error) return <p>Error :( </p>

    return (
        <div className="review-card">
            <div className="rating">{data.review.data.attributes.rating}</div>
            <h2>{data.review.data.attributes.title}</h2>
            {data.review.data.attributes.categories.data.map( c => (
                <small key={c.id}>{c.attributes.name}</small>
            ))}
            <p>{data.review.data.attributes.body}</p>
        </div>
    )
}

export default ReviewDetails;