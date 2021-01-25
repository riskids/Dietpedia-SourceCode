import React, { Component } from 'react'
import ArticleCard from '../Component/ArticleCard'

class Article extends Component {
  render() {
    return (
      <div className="container">
          <div className="row">
              <ArticleCard/>
          </div>
      </div>

    )
  }
}

export default Article
