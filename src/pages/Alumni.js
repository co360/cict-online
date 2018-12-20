import { Button, Checkbox, Form, Icon, Input, notification, Popover, Select, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Clock, MapPin } from 'react-feather';
import Gravatar from 'react-gravatar';
import { Fade, Slide } from 'react-reveal';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';
import { Link } from 'react-static';
import InlineSVG from 'svg-inline-react';
import uuidv4 from 'uuid/v4';

import brandIconLight from '../assets/brandicon-light.svg';
import bgLeft from '../assets/misc/alumni-2019-bg-left.jpg';
import bgRight from '../assets/misc/alumni-2019-bg-right.jpg';
import brandLogo from '../assets/misc/alumni-2019-brand.svg';
import divider from '../assets/misc/divider.svg';
import ogImage from '../assets/misc/alumni-2019.jpg';
import Helmet from '../components/Helmet';
import Navbar from '../components/Navbar';
import DisqusThread from '../components/DisqusThread';

const jdenticon = require('jdenticon')

const theme = {
    text: 'font-light alumni-2019-theme-text--color mt-2',
    link: 'alumni-2019-theme-text--color mt-2 no-underline hover:text-orange',
}

const FormItem = Form.Item;
const Option = Select.Option;
const yearStartRange = _.range(2000, (new Date()).getFullYear(), 1)
const yearEndRange = _.range(2004, (new Date()).getFullYear(), 1)
const courses = [
    {
        name: 'Bachelor of Science in Information Management',
        value: 'bsim'
    },
    {
        name: 'Bachelor of Science in Information Technology',
        value: 'bsit'
    },
    {
        name: 'Bachelor of Science in Information Systems',
        value: 'bsis'
    },
    {
        name: 'Bachelor of Science in Computer Science',
        value: 'bscs'
    },
    {
        name: 'Masters in Information Technology',
        value: 'mit'
    },
]
class Alumni extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attendees: [],
            email: '',
            fname: '',
            mname: '',
            sname: '',
            ystart: '',
            yend: '',
            course: '',
            company: '',
            contact: '',
            noGravatar: false,
            submitting: false,
            count: 0,
            loadingAttendees: true,
            formKey: uuidv4()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitting: true })
        const { fname, mname, sname, ystart, yend, course, company, contact, email, noGravatar } = this.state
        axios.get('https://us-central1-cict-online.cloudfunctions.net/addNewEntry', {
            params: {
                data: [
                    moment().format('MMMM Do YYYY, h:mm:ss a'),
                    fname,
                    mname,
                    sname,
                    ystart,
                    yend,
                    course,
                    company,
                    contact,
                    email,
                    noGravatar
                ]
            }
        }).then(res => {
            const app = this
            if (res) {
                notification['success']({
                    message: 'See you soon!',
                    description: 'You are now registered! Please check our Facebook group for updates.',
                    onClose: () => {
                        app.getLatestData();
                    }
                });
            } else {
                notification.open({
                    message: 'Ooops!',
                    description: 'Sorry and error occured. Please contact us on our Facebook page.',
                });
            }
            setTimeout(() => {
                this.props.form.resetFields();
                this.setState({
                    submitting: false,
                    formKey: uuidv4()
                })
            }, 1000)
        })
    }

    handleSelectionChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    getLatestData = (start, end) => {
        const app = this
        const attendeesQuery = `https://us-central1-cict-online.cloudfunctions.net/getRegisteredEntries?start=${start || 2}&end=${end || 5}`;
        axios.get(attendeesQuery).then(res => {
            if (Object.keys(res.data) !== 0) {
                app.setState({ attendees: res.data.reverse() })
            }
        })

        const countQuery = `https://us-central1-cict-online.cloudfunctions.net/countAllRegistered`;
        axios.get(countQuery).then(res => {
            if (Object.keys(res.data) !== 0) {
                app.setState({ count: res.data.length, loadingAttendees: false })
            }
        })
    }

    componentDidMount() {
        const app = this
        app.getLatestData()
    }

    onCheckboxChange = e => {
        const { name, checked } = e.target
        this.setState({ [name]: checked })
    }

    countAttendees = count => {
        switch (count) {
            case 0:
                return 'Be the first to register!'
            case 1:
                return 'Wow! You are the first to register!'
            default:
                return <React.Fragment><span className="font-bold">{count}</span> CICTzens are attending!</React.Fragment>
        }
    }

    render() {
        const { attendees, email, noGravatar, submitting, formKey, count, loadingAttendees } = this.state
        const url = 'http://cictwvsu.com/alumni/';
        const quote = 'Register now!';
        return (
            <React.Fragment>
                <Helmet
                    title="Online Registration"
                    description="CICT Alumni Homecoming Registration"
                    ogImage={ogImage}
                    url="https://cictwvsu.com/alumni"
                />
                <Navbar />
                <div className="w-full text-center bg-no-repeat bg-left-bottom" style={{ backgroundImage: `url(${bgLeft})` }}>
                    <div className="w-full text-center bg-no-repeat bg-right-bottom" style={{ backgroundImage: `url(${bgRight})` }}>

                        <div className="bg-white mx-auto max-w-sm rounded pb-8">

                            <Slide top>
                                <img src={brandLogo} className="alumni-2019-brand mx-auto mt-8" alt="" />
                            </Slide>
                            <Fade>
                                <div className="container mx-auto px-8">
                                    <h1 className={theme.text}><a className={theme.link} href="https://twitter.com/search?q=cicttweet16&src=typd&lang=en" target="_black" rel="noopener noreferrer">#tweet16</a></h1>
                                    <p className={theme.text}><MapPin className={[theme.text, 'w-4 h-4']} /> West Visayas State University, CICT Grounds, Iloilo City</p>
                                    <p className={theme.text}><Clock className={[theme.text, 'w-4 h-4']} /> 8:30 AM - 6:00 PM</p>
                                </div>
                            </Fade>
                            <Fade>
                                <Spin spinning={submitting}>
                                    <Form key={formKey} onSubmit={this.handleSubmit} className="alumni-registration-form px-4 lg:px-auto mx-auto py-8 text-left sm:px-4 xs:px-4">
                                        <small>* Required Fields</small>
                                        <FormItem required label="Basic Info" className="my-0">
                                            <FormItem className="mt-0">
                                                <Input addonBefore="First Name" required size="large" name="fname" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="* Your First Name" onChange={e => this.handleChange(e, 'fname')} />
                                            </FormItem>
                                            <FormItem>
                                                <Input addonBefore="Middle Name" required size="large" name="mname" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="* Your Middle Name" onChange={e => this.handleChange(e, 'mname')} />
                                            </FormItem>
                                            <FormItem>
                                                <Input addonBefore="Last Name" required size="large" name="sname" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="* Your Last Name" onChange={e => this.handleChange(e, 'sname')} />
                                            </FormItem>
                                        </FormItem>

                                        <FormItem required label="Year Entered the College">
                                            <Select showSearch size="large" placeholder="Select a Year" onChange={e => this.handleSelectionChange(e, 'ystart')}>
                                                {yearStartRange.map(i => (
                                                    <Option key={i} value={i}>{i}</Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                        <FormItem required label="Year Graduated from the College">
                                            <Select showSearch size="large" placeholder="Select a Year" onChange={e => this.handleSelectionChange(e, 'yend')}>
                                                {yearEndRange.map(i => (
                                                    <Option key={i} value={i}>{i}</Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                        <FormItem required label="Course">
                                            <Select showSearch size="large" placeholder="Select a Course" onChange={e => this.handleSelectionChange(e, 'course')}>
                                                {courses.map(i => (
                                                    <Option key={i.value} value={i.value}>{i.name}</Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                        <FormItem required label="Company Affiliated">
                                            <Input required addonBefore="Details" name="company" size="large" placeholder="Where are you working now?" onChange={e => this.handleChange(e, 'company')} />
                                        </FormItem>
                                        <FormItem required label="Profile Email">
                                            <FormItem>
                                                <p className="text-center mb-4" >
                                                    {
                                                        noGravatar ?
                                                            <InlineSVG src={jdenticon.toSvg(email, 150)} className="rounded-full mx-0 my-4" /> :
                                                            <Gravatar default="monsterid" size={150} className="rounded-full mx-0 my-4" email={email} />
                                                    }
                                                </p>
                                                <Input addonBefore={noGravatar ? "Email" : "Gravatar Email"} type="email" size="large" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={noGravatar ? "Email" : "Gravatar Email"} onChange={e => this.handleChange(e, 'email')} name="email" />
                                                <p><a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">Create your own Gravatar</a></p>
                                                <Checkbox name="noGravatar" checked={noGravatar} onChange={this.onCheckboxChange}>I don't have a Gravatar email.</Checkbox>
                                            </FormItem>
                                            <FormItem required label="Mobile/Landline">
                                                <Input name="contact" size="large" placeholder="Your Number" onChange={e => this.handleChange(e, 'contact')} />
                                            </FormItem>


                                        </FormItem>

                                        <p className="text-center">
                                            <Button loading={submitting} type="primary" htmlType="submit" className="w-full">
                                                Register Now
                                        </Button>
                                        </p>
                                    </Form>
                                </Spin>
                                <div className="text-center">
                                    <p className="mb-4">Share with your friends!</p>
                                    <div className="inline-flex mx-auto">
                                        <div className="zoom">
                                            <FacebookShareButton
                                                url={url}
                                                quote={quote}
                                                className="mx-2"
                                            >
                                                <FacebookIcon
                                                    size={32}
                                                    round />
                                            </FacebookShareButton>
                                        </div>
                                        <div className="zoom">
                                            <TwitterShareButton
                                                className="mx-2"
                                                url={url}
                                                title={quote}
                                            >
                                                <TwitterIcon
                                                    size={32}

                                                    round />
                                            </TwitterShareButton>
                                        </div>

                                        <div className="zoom">
                                            <EmailShareButton
                                                className="mx-2"
                                                url={url}
                                                subject={quote}
                                                body="Register for CICT Alumni Homecoming 2019!"
                                            >
                                                <EmailIcon
                                                    size={32}
                                                    round />
                                            </EmailShareButton>
                                        </div>
                                    </div>
                                </div>
                            </Fade>

                        </div>
                        <div className="max-w-md mx-auto pb-8">
                            <img src={divider} className="w-48 h-auto mx-auto mt-4 mb-8" alt="" />
                            <h3 className={theme.text}>{this.countAttendees(count)}</h3>
                            <Spin className="mx-auto w-full" spinning={submitting}>
                                <div className="flex flex-wrap mt-8 mx-4">
                                    {loadingAttendees && <Spin className="mx-auto" />}
                                    {attendees && attendees.map(i => (
                                        <div key={uuidv4()} className="sm:w-full md:w-full lg:w-1/6 xl:1/6 mb-4 zoom justify-center text-center">

                                            <Popover content={
                                                <p>
                                                    Batch {i[5]}, {_.upperCase(i[6])}
                                                </p>
                                            } title={`${i[3]}, ${i[2]} ${i[1]}`}>
                                                <div className="w-16 h-16 border-2 mb-4 rounded-full alumni-2019-theme-border--color p-2">
                                                    {
                                                        JSON.parse(i[10]) ?
                                                            <InlineSVG src={jdenticon.toSvg(i[9], 44)} className="w-16 h-auto rounded-full" /> :
                                                            <Gravatar default="monsterid" size={100} className="w-16 h-auto rounded-full" email={i[9]} />
                                                    }
                                                </div>
                                            </Popover>

                                        </div>
                                    )
                                    )}

                                    {!loadingAttendees && <Link to="/homecoming2019" className="w-16 h-16 border-2 mb-4 rounded-full alumni-2019-theme-border--color p-2 zoom">
                                        <div className="bg-blue text-white rounded-full font-bold alumni-count-more">
                                            +{count - 4}
                                        </div>
                                    </Link>}

                                </div>
                            </Spin>
                        </div>
                        <Link className="font-bold mt-8" to="/homecoming2019">View All</Link>
                        <div className="max-w-sm mx-auto mt-4 mb-8 px-4">
                            <DisqusThread
                                id="main"
                                title="CICT Allumni Homecoming"
                                path="https://cictwvsu.com/alumni/"
                            />
                            <p className="mb-2"><small>Help us build a better college website!</small></p>
                            <Button href="https://github.com/wvsu-cict-code/cict-online" target="_blank" icon="github">Contribute</Button>
                        </div>
                    </div>

                </div>
                <footer className="justify-between flex-wrap cict-darker p-8">
                    <div className="container mx-auto text-center">
                        <Link className="mx-4 p-4" to="/"><img className="h-8" src={brandIconLight} alt="CICT Online Logo" /></Link>
                        <p className="flex mx-4 p-4 text-grey-dark items-center leading-loose">
                            <small className="mx-auto">
                                <span>&lt;/&gt; with &lt;3 by CICTzens | 2016 - Present</span>
                            </small>
                        </p>

                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

const WrappedForm = Form.create()(Alumni);

export default WrappedForm