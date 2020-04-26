import React from 'react'
import SEO from 'components/SEO'
import { Layout } from 'antd'
import Footerbar from 'components/Footerbar';
import SocialSection from 'components/SocialSection';
import Navbar from 'components/Navbar';
export default () => (
  <div>
    <SEO
      title="WVSU CICT - Apply"
      description="Apply Now."
      url="https://cictwvsu-dev.netlify.app/applynow"
      image="https://github.com/wvsu-cict-code/cict-online/raw/development/src/assets/social-image.jpg"
      twitterUsername="cictwvsu"        
    />
    <Layout className="layout">
      <Layout>
        <Navbar showApplication={false} />
        <div className="bg-white p-0 px-8">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSffrJ9taFHBEfJV360WN7yIBI1dGWYvEIiTITkbKWsdOPowzQ/viewform?embedded=true" className="w-full min-h-screen">Loading…</iframe>
        </div>
        <SocialSection />
        <Footerbar />
      </Layout>
    </Layout>
  </div>
)
