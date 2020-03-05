import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Link } from 'react-router-dom'
import TagList from '../TagList'
import AddToFavorites from '../AddToFavorites'
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
   description: string
   favorited: boolean
   favoritesCount: number
   slug: string
   title: string
   tagList: [] | string[]
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
                  <div className="pull-xs-right">
                     <AddToFavorites
                        isFavorited={article.favorited}
                        favoritesCount={article.favoritesCount}
                        articleSlug={article.slug}
                     />
                  </div>
               </div>
               <Link
                  to={`/articles/${article.slug}`}
                  className="preview-link"
               >
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <TagList tags={article.tagList} />
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
