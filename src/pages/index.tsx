import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Divider, Grid, Layout, Row, Button } from 'antd';
import { ArrowRight } from 'react-feather';
import Navbar from 'components/Navbar';
import SEO from 'components/SEO';
import SocialSection from 'components/SocialSection';
import { filter } from 'lodash';
import { ExternalLink } from 'react-feather';
import Masonry from 'react-masonry-css';
import Slider from "react-slick";
import { useRouteData } from 'react-static';
import TimeAgo from 'react-timeago';
import { Post } from 'types';
import '../app.less';

import AdmissionIconLight from '../assets/admission-light.svg';
import FacultyStaffIconLight from '../assets/faculty-and-staff-light.svg';
import AdmissionIconDark from '../assets/admission-dark.svg';
import FacultyStaffIconDark from '../assets/faculty-and-staff-dark.svg';

import BLISIconDark from '../assets/blis-icon.svg';
import CSIconDark from '../assets/cs-icon.svg';
import EMCIconDark from '../assets/emc-icon.svg';
import ISIconDark from '../assets/is-icon.svg';
import ITIconDark from '../assets/it-icon.svg';
import MITIconDark from '../assets/msit-icon.svg';

import BLISIconLight from '../assets/blis-icon-light.svg';
import CSIconLight from '../assets/cs-icon-light.svg';
import EMCIconLight from '../assets/emc-icon-light.svg';
import ISIconLight from '../assets/is-icon-light.svg';
import ITIconLight from '../assets/it-icon-light.svg';
import MITIconLight from '../assets/msit-icon-light.svg';

import CICTLogo from '../assets/logo.svg';
import Footerbar from '../components/Footerbar';
import ICTGraphicsDark from '../assets/ict.svg';
import ICTGraphicsLight from '../assets/ict-light.svg';
import ReactTypingEffect from '../components/ReactTypingEffect';
import { DEFAULT_THEME } from '../themes';
import { applyTheme } from '../themes/utils';
import { Link } from '@reach/router';

const { Content } = Layout;

const { useBreakpoint } = Grid

const programs = [
  {
    id: "it",
    name: "Information Technology",
    iconLight: ITIconLight,
    iconDark: ITIconDark,
    description: "Study, analyze, design, develop, implement, and evaluate ICT solutions. "
  },
  {
    id: "is",
    name: "Information Systems",
    iconLight: ISIconLight,
    iconDark: ISIconDark,
    description: "Design and implementation of solutions that integrate information technology with business processes. "
  },
  {
    id: "cs",
    name: "Computer Science",
    iconLight: CSIconLight,
    iconDark: CSIconDark,
    description: "Designing, writing and developing computer programs and computer networks."
  },
  {
    id: "blis",
    name: "Library and Information Science",
    iconLight: BLISIconLight,
    iconDark: BLISIconDark,
    description: "Management of library operations, the systematic organization, conservation, preservation and restoration of books, historical and cultural documents and other intellectual properties."
  },
  {
    id: "emc",
    name: "Entertainment and Multimedia Computing",
    iconLight: EMCIconLight,
    iconDark: EMCIconDark,
    description: "Computing in the design and development of multimedia products and solutions. "
  },
  {
    id: "mit",
    name: "Masters in Information Technology",
    iconLight: MITIconLight,
    iconDark: MITIconDark,
    description: "Advanced computing subjects, or move into a new IT specialisation. "
  },

]

const quicklinks = [
  {
    id: "adm",
    name: "Admission Guide",
    link: "/admission",
    iconLight: AdmissionIconLight,
    iconDark: AdmissionIconDark
  },
  {
    id: "t",
    name: "Faculty and Staff",
    link: "/team",
    iconLight: FacultyStaffIconLight,
    iconDark: FacultyStaffIconDark
  },
]

function createMarkup(content: string) { return { __html: content } }

const Arrow = (props: any) => {
  const { className, style, onClick, symbol } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      {symbol}
    </div>
  );
}

const slickSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  arrows: true,
  nextArrow: <Arrow symbol=">" />,
  prevArrow: <Arrow symbol="<" />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const Public = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  /**
   * Run the applyTheme function every time the theme state changes
   */
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const themeModeHandler = () => (theme === 'base' ? setTheme('dark') : setTheme('base'));

  const screens = useBreakpoint()

  const breakpoints = Object.entries(screens)
    .filter(screen => !!screen[1])
    .map(screen => screen[0])

  const { posts }: { posts: any } = useRouteData()

  let fbvideostring = `<iframe style="max-width: 734px; height:${breakpoints.includes('md') ? '411px' : 'auto'}" class="mx-auto my-8 bg-gray-300 w-full h-auto" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fcictwvsu%2Fvideos%2F358272304557481%2F&show_text=false&width=734&appId=2302291186701393&height=411" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>`

  return (
    <div style={{ backgroundColor: '#000' }} >
      <div>
        <SEO
          title="WVSU CICT | Your Future with Technology"
          description="Official website of the College of ICT."
          url="https://cictwvsu.com/"
          image="https://github.com/wvsu-cict-code/cict-online/raw/development/src/assets/social-image-2.jpg"
          twitterUsername="cictwvsu"
        />
        <Layout>
          <Layout>
            <Navbar showApplication={false} themeState={theme} themeModeHandler={themeModeHandler} defaultSelected={['1']} />
            <Content className="layout p-0 px-8">
              <div>
                <div className="w-full">
                  <div className="billboard">
                    <div className="container mx-auto billboard-greeting">
                      <Row>
                        <Col span={breakpoints.includes('md') ? 12 : 24}>
                          <div className={`billboard-greeting-text ${theme !== 'base' && 'text-white'}`}>
                            <span className="text-lg">Your Future with Technology</span>
                            <span className="billboard-header">{"~$"}<ReactTypingEffect speed={100} eraseDelay={5000} typingDelay={200} text="echo 'Hello World!'"></ReactTypingEffect></span>
                            <span className="font-normal text-lg">
                              West Visayas State University College of ICT continues the <b>tradition of excellence</b> through <b>quality education</b>, <b>innovative ICT researches</b>, and <b>extension services</b> to various stakeholders.
                          </span>
                            <Divider />
                            <Alert type="warning" showIcon message={<span>*Online Application is now catered by the Integrated University Information System. You may check our link below for guide and support.<br /></span>} />
                            {/* <a href="/applynow" className={breakpoints.includes('md') ? "w-64 apply-button" : "w-full apply-button"}>Apply Now</a>                             */}
                          </div>
                        </Col>
                        <Col span={breakpoints.includes('md') ? 12 : 24}>
                          <img src={theme === 'base' ? ICTGraphicsDark : ICTGraphicsLight} className="img-billboard mx-auto mt-8" />
                        </Col>
                      </Row>

                    </div>
                  </div>
                </div>
                <Divider />
                <div className="w-full">
                  <div className="container mx-auto py-8">
                    <h2 className="text-center text-primary-text text-4xl">Quick Links</h2>
                    <p className="max-w-lg mx-auto text-center text-primary-text font-normal text-lg mb-8">Need help with the admission? Wanna learn more about your instructor? We got your back!</p>
                    <div className="px-8">
                      <Slider {...slickSettings}>
                        {quicklinks.map(i => (
                          <Link key={i.id} to={i.link}>
                            <div className="w-32 mx-auto">
                              <img className="mx-auto h-36 mb-2" src={theme === 'base' ? i.iconDark : i.iconLight} alt="" />
                              <p className="text-center text-primary-text text-lg mx-auto underline" style={{ maxWidth: '180px' }}>{i.name}</p>
                            </div>
                          </Link>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="w-full">
                  <div className="container mx-auto py-8">
                    <h2 className="text-center text-primary-text text-4xl">Courses Offered</h2>
                    <p className="max-w-lg mx-auto text-center text-primary-text font-normal text-lg">Choose your Foundation.</p>
                    <div className="px-8">
                      <Slider {...slickSettings}>
                        {programs.map(i => (
                          <div key={i.id} className="w-32 mx-auto">
                            <img className="mx-auto h-40" src={theme === 'base' ? i.iconDark : i.iconLight} alt="" />
                            <p className="text-center text-primary-text text-lg mx-auto" style={{ maxWidth: '180px' }}>{i.name}</p>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="container mx-auto py-8">
                    <h2 className="text-center text-primary-text text-4xl">News and Updates</h2>
                    <p className="max-w-lg mx-auto text-primary-text text-center font-normal text-lg mb-4">Discover CICT stories, studies and much more.</p>
                    <Masonry
                      breakpointCols={{
                        default: 4,
                        1280: 4,
                        800: 2,
                        700: 2,
                        500: 1
                      }}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column">
                      {posts && filter(posts.items, (post: Post) => post.categories.length > 0).slice(0, 8).map((post: Post) => (
                        <Card bodyStyle={{ backgroundColor: theme === 'base' ? '#fff' : '#111' }} bordered={false} className="card-component" key={post.guid} actions={[
                          <a key="1" href={post.link} target="_blank"><span className="flex w-40 mx-auto"><span className="mx-auto">Read this Story</span><span><ExternalLink className="ml-4" key="link" /></span></span></a>,
                        ]} style={{ width: '290px', margin: '0 auto', marginBottom: '30px' }} cover={<div className="h-64 w-full bg-center no-repeat bg-cover" style={{ backgroundImage: `url(${post.thumbnail})` }} />}>
                          <Card.Meta title={<span className={theme !== 'base' && 'text-white'}>{post.title}</span>} description={<span className={theme !== 'base' && 'text-white'} ><TimeAgo date={post.pubDate} /></span>}></Card.Meta>
                        </Card>
                      ))}
                    </Masonry>
                    <p className="text-center">
                      <Button className="mx-auto" type="primary" size="large" href="https://medium.com/cictwvsu-online" target="_blank">Read More On Our Medium Page <ArrowRight size="20" className="inline" /> </Button>
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <div className="container mx-auto py-8">
                    <img src={CICTLogo} className="w-40 h-40 mx-auto my-4" alt="CICT Logo" />
                    <h2 className="text-center text-primary-text text-4xl">Upholding the Tradition of Excellence</h2>

                    <div dangerouslySetInnerHTML={createMarkup(fbvideostring)}></div>
                    <p className="max-w-lg mx-auto text-center text-primary-text font-normal text-lg">Information and Communications Technology has penetrated the core of societal and individual lives. Its development is changing the course of all other technologies. ICT has now become less of a choice and more of a requirement for individuals and societies concerned with competitiveness in the international arena.</p>
                  </div>
                </div>
              </div>
            </Content>
            <SocialSection themeState={theme} />
            <Footerbar themeState={theme} />
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export default Public