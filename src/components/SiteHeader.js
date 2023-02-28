import React from 'react';
import { Link } from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

 const CATEGORIES = gql`
 query GetCategories {
      categories {
        data {
          id
          attributes{
            name
          }
        }
      }
    }
`

function SiteHeader() {
     const { loading, error, data } = useQuery(CATEGORIES)

    if (loading) return <p>Loading Categories...</p>
    if (error) return <p>Error Fetching Categories!</p>

    return (
        <div className="site-header">
            <Link to="/">
                <h1>Ninja Reviews</h1>
            </Link>
            <nav className="categories">
                <span>Filter reviews by category:</span>
                {data.categories.data.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>
                        {category.attributes.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default SiteHeader;