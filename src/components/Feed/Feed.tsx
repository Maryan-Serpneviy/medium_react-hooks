import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Link } from 'react-router-dom'
import classes from './Feed.module.scss'

type Props = {
   articles: object[]
}

type Article = {
   author: {
      username: string
      image: string
   }
   createdAt: string
   slug: string
   title: string
   description: string
   tagList: string[]
}

const GlobalFeed: React.FC<Props> = ({ articles }: InferProps<typeof GlobalFeed.propTypes>) => {
   return (
      <div className={classes.feed}>
         {articles.map((article: Article, index) => (
            <div className="article-preview" key={index}>
               <div className="article-meta">
                  <Link to={`/profiles/${article.author.username}`}>
                     <img src={article.author.image} alt="" />
                  </Link>
                  <div className="info">
                     <Link
                        to={`/profiles/${article.author.username}`}
                        className="author"
                     >
                        {article.author.username}
                     </Link>
                     <span className="date">{article.createdAt}</span>
                  </div>
               </div>
               <Link
                  to={`/articles/${article.slug}`}
                  className="preview-link"
               >
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                     {article.tagList.map(tag => (
                        <li key={tag} className="tag-default tag-pill tag-outline">
                           {tag}
                        </li>
                     ))}
                  </ul>
               </Link>
            </div>
         ))}
      </div>
   )
}

GlobalFeed.propTypes = {
   articles: PropTypes.array.isRequired
}

export default GlobalFeed
