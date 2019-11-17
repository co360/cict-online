import { Avatar, Card, Divider } from 'antd';
import { graphql, Link, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import sizeMe from 'react-sizeme';
import StackGrid from "react-stack-grid";
import appsLogo from '../img/apps.svg';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const { Meta } = Card;

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { 
      size: { 
        width
      } 
    } = this.props;

    return (
      <div className="columns is-multiline">
        <StackGrid        
        columnWidth={width <= 350 ? '100%' : '33.33%'}
      >
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <Card style={{ marginBottom: '2rem', width: 290 }}
             cover={
              <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                          }`,
                        }}
                      />
            }
             actions={[<Link to={post.fields.slug}>Read More</Link>]}
            >
              <Meta                
                title={post.frontmatter.title}
                description={post.excerpt}
              />  
              <Divider />
              <small style={{opacity: 0.5}}>by <Avatar src={appsLogo} />CICT Admin | {post.frontmatter.date} </small>                       
            </Card>
          </div>
        ))}
      </StackGrid>                
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const BlogRollRender = sizeMe()(BlogRoll)

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 150)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRollRender data={data} count={count} />}
  />
)
