import React, { useEffect, useState } from "react";
import "./landingPage.css";
import { Link } from "react-scroll";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import JobsPage from "./JobsPage";

const Landing = () => {
  const navigate = useNavigate();
  const [showJob,setShowJob] = useState(false)

  const [faqs, setFaqs] = useState([
    {
      heading: "What is Idealist Search?",
      content:
        "Idealist search is an AI-powered platform that allows companies to find top talent around the world. ",
      shown: false,
    },
    {
      heading: "How Smart Search Helps to find better candidates?",
      content:
        "Idealist search provides an AI-powered smart search feature, by the help of this feature employees can find talent according to location, soft skills, technical skills, work experience and education. With just a couple of clicks our AI powered algorithm will provide top talent accoridng to your needs. ",
      shown: false,
    },
    {
      heading: "What are some great features in upcoming updates?",
      content:
        "We are constantly improving Meerkat Search to provide top-notch AI features to employees.  In the upcoming updates, we will provide an improved version of smart search which will directly find top candidates according to a specific job posting, we will also provide a candidate tracking feature which will help hiring managers to track each selected candidate and it will also be helpful for us to improve our AI algorithm. ",
      shown: false,
    },
  ]);

  const changeNavbar = () => {
    $(document).ready(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $(".custom_nav").addClass("shadow");
        } else {
          $(".custom_nav").removeClass("shadow");
        }
      });
    });
  };


  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signup/user");
  };

  const moveToDashboard = () => {
    navigate("/dashboard/home");
  };

  useEffect(() => {
    changeNavbar();
  }, []);

  const cardsContent = [
    {
      img: "img1.png",
      heading: "Talented Candidates",
      description:
        "Idealist is a Machine Learning platform that learns from your previous successful and unsuccessful matches. We will connect the software to your hiring history and help you find better and faster matches with future candidates.",
    },
    {
      img: "img2.png",
      heading: "Smart Search",
      description:
        "Idealist uses Deep Neural Networks to not only learn from your companies prior matches with candidates but also find soft skills in CV's and publicly available information from candidates.",
    },
    {
      img: "img3.png",
      heading: "Valuable Insights",
      description:
        "We will provide you with new insights with regards to how you can best position future hires and what the indicators for successful hires in the past have been",
    },
  ];


  return (
    <>
      {
        //************  NAVBAR **************
      }
      <nav className="bg-white custom_nav border-gray-200 px-5 sm:px-4 py-2.5 fixed top-0 left-0 right-0 border-1 border-gray-100 dark:bg-gray-800 z-30">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link
            className="bg-white"
            style={{ backgroundColor: "#ffffff" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <img 
              src={require("./../../img/bgsidebar.jpeg") }
              style={{ width: 140, height: 90 }}
              className="w-50"
              alt="lOGO"
            />
          </Link>

          <div className="flex md:order-2">
                <button
                  style={{ border: 'none' }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-0"
                onClick={moveToLogin}
              >
                {" "}
                Login
              </button>
     

            <button
              style={{ border: 'none' }}
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul style={{ listStyleType: 'none' }} className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lge md:font-medium">
              <li>
                <Link
                  className="block py-2 px-3 text-gray-600 rounded md:bg-white md:text-blue-700 md:p-0"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}

                  onClick={()=>{setShowJob(false)}}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 "
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={()=>{setShowJob(false)}}

                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 "
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={()=>{setShowJob(true)}}
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0"
                  to="about_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}

                  onClick={()=>{setShowJob(false)}}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={()=>{setShowJob(false)}}

                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        //************  LANDING CONTENT **************
      }
     {!showJob ?<div>

      <div className="mt-24" id="home">
        <div className="gap-3 flex flex-wrap w-full">
          <div className="pl-3 md:pt-20 md:w-6/12 xl:pl-36 xl:pt-36 2xl:pl-44 2xl:pt-44">
            <h2 className="text-3xl font-bold lg:w-9/12 xl:w-9/12 xl:text-4xl 2xl:text-5xl">
              <span className="highlight">Idealist</span> A Smart Recruitment
              Solution
            </h2>
            <p className="text-gray-500 text-sm font-medium w-75 xl:w-7/12 2xl:w-6/12">
              Idealist provides easy and smart recruitment solutions, by which
              Tech Companies & Scale Ups can easily hire talented candidates{" "}
            </p>
            <div className="mt-4">
              <button
                style={{ border: 'none' }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={moveToSignUp}
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
         
              <Link
                className="contact_btn mx-3 font-medium text-blue-800 hover:text-blue-800"
                to="contact_us"
                spy={true}
                smooth={true}
                offset={-90}
                duration={500}
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="hidden w-5/12 md:block ">
            <div className="w-full">
              <img
                src={require("./../../img/illustrations2.png")}
                className="img-fluid"
                alt="landing img"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center hidden">
          <div className="flex justify-content-around logos_card my-5 text-white w-8/12">
            <div className="logo">
              <img
                src={require("./../../img/05.png")}
                className=""
                style={{ width: "100%", height: "100%" }}
                alt="FLEX"
              />
            </div>
            <div className="logo">
              <img
                src={require("./../../img/03.png")}
                className=""
                style={{ width: "100%", height: "100%" }}
                alt="FLEX"
              />
            </div>
            <div className="logo">
              <img
                src={require("./../../img/01.png")}
                className=""
                style={{ width: "100%", height: "100%" }}
                alt="FLEX"
              />
            </div>
            <div className="logo">
              <img
                src={require("./../../img/04.png")}
                className=""
                style={{ width: "100%", height: "100%" }}
                alt="FLEX"
              />
            </div>
            <div className="logo">
              <img
                src={require("./../../img/02.png")}
                className=""
                style={{ width: "100%", height: "100%" }}
                alt="FLEX"
              />
            </div>
          </div>
        </div>
      </div>

      {
        //************  SERVICE SECTION **************
      }

      <div id="services">
        <div className="left_black_img">
          <img
            src={require("./../../img/Group 61.png")}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="right_black_img">
          <img
            src={require("./../../img/Group 1667.png")}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div id="section2" className="w-100">
          <div className="flex justify-center text-center text-4xl font-semibold">
            <div className=" 2xl:w-3/12">
              <span style={{ color: "#4E79CF" }}>Fast </span>and Relaible{" "}
              <span style={{ color: "#4E79CF" }}>Recruitment</span> Solution
            </div>
          </div>
          <div className="flex text-center my-28">
            <div className="services_bg ml-80">
              <img
                className=""
                src={require("./../../img/Group 1669.png")}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="w-100 gap-3 flex flex-wrap justify-center xl:space-x-16 2xl:space-x-24">
              {cardsContent.map((el, i) => (
                <div key={i} className="">
                  {" "}
                  <Card
                    img={el.img}
                    heading={el.heading}
                    description={el.description}
                  />{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {
        //************  About SECTION **************
      }
      <div className="candidate_div" id="about_us">
        <div className="container">
          <div id="section3">
            <div className="flex flex-wrap md:gap-0 md:justify-between">
              <div className="md:w-6/12 md:mt-20">
                <h1 className="text-8xl font-semibold text-blue-500">
                  About Us
                </h1>
              </div>
              <div className="md:w-6/12 text-justify text-xl text-gray-600 font-normal">
                {" "}
                Idealist Search was created by Hajo van Beijma and Abdul Rehman.
                <br />
                <br />
               Zeshan Ali is the founder of Idealist and helps tech
                companies and scale-ups with finding new talent. He connects
                leaders to the right scale-ups. This is a role well-suited to
                him and inline with his executive search experiences and as a
                tech entrepreneur. Zeshan is supported by a tech team developing a
                Deep Learning approach using Transformers to help match
                candidates with jobs.
                <br />
                <br />
                Ans Zeshan is a tech team member of Idealist. He is a freelance
                data scientist and full-stack web developer. Having effective
                communication, management, and technical skills he solves
                business problems and provides technical solutions to help grow
                the business.
                <br />
                <br />
                Idealist is an innovative platform that can change the way
                traditional hiring happens.
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {
        //************  CONTACT US **************
      }
      <div className="contact_us" id="contact_us">
        <div className="flex flex-wrap justify-between p-4">
          <div className="text-white lg:w-5/12 xl:w-4/12 2xl:w-3/12">
            <h1 className="text-white text-xl font-bold lg:text-4xl lg:pt-20 2xl:pt-36 2xl:text-5xl">
              Contact Us
            </h1>
            <p className="text-white text-sm font-normal text-justify">
              If you have any question feel free to contact us, our team will
              get to you in minutes and help you with everything you need!
            </p>
          </div>
          <div className="contact_us_right lg:w-6/12 2xl:pt-36">
            <form className="row">
              <div className="col-6">
                <input type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="col-6">
                <input type="text" id="lastName" placeholder="Last name" />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  id="emailAddress"
                  placeholder="Email Address"
                />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your message here!"
                  defaultValue={""}
                />
              </div>
              <div className="col-12 submit_div">
                <button
                  style={{ border: 'none' }} className="btn btn-primary " type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-100 mt-52" id="faq_section">
        <div className="flex justify-center text-center fw-bold fs-2">
          <div className="2xl:w-4/12">
            {/* <div className=" text-2xl">
              <span style={{ color: "#4E79CF" }}>FAQs</span>{" "}
            </div> */}
            <div className="text-4xl font-semibold">
              <span>
                Frequently Asked{" "}
                <span style={{ color: "#4E79CF" }}>Questions</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <div className="w-6/12">
            {faqs.map((item, index) => {
              return (
                <div
                  key={index}
                  id={`accordion-flush-${index}`}
                  className="border-b border-gray-200 py-4"
                  data-accordion="collapse"
                  data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  data-inactive-classes="text-gray-500 dark:text-gray-400"
                >
                  <h2 id={`accordion-flush-heading-${index}`}>
                    <button
                      type="button"
                      className={`flex justify-between items-center py-2 w-full font-medium text-left ${
                        item.shown===false? "text-gray-500":"text-gray-500"
                      } border-gray-200`}
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls={`accordion-flush-body-${index}`}
                      style={{ border: 'none', backgroundColor: 'white', fontWeight: '300' }}
                      onClick={() => {
                        let newFaqs = [...faqs];
                        faqs[index].shown = !faqs[index].shown;
                        setFaqs(newFaqs);
                      }}
                    >
                      <span className="font-semibold text-xl">
                        {item.heading}
                      </span>
                      <svg
                        data-accordion-icon
                        className={`w-6 h-6 ${
                          item.shown === true ? "rotate-180" : ""
                        } shrink-0`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-flush-body-${index}`}
                    className={`${item.shown === true ? "" : "hidden"} pb-3`}
                    aria-labelledby={`accordion-flush-heading-${index}`}
                  >
                    <div className="py-2 dark:border-gray-700">
                      <p className="mb-2 font-medium text-gray-500 dark:text-gray-400 text-justify">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      </div>: <JobsPage/>}
      {
        //************  FOOTER **************
      }
      <footer className="text-lg-start">
        <div className="text-md-start pb-36">
          {/* Grid row */}
          <div className="gap-3 flex flex-wrap">
            {/* Grid column */}
            <div className="ml-4 mb-4 w-72 2xl:ml-64">
              {/* Content */}
              <img
                src={require("./../../img/bgsidebar.jpeg")}
                // style={{ width: 80, height: 80 }}
                alt="linkdin"
                className="w-44"
              />
              <p className="pt-4 text-justify text-gray-500">
              Idealist focusses on tech companies & Scale-Ups. We help you find
                your new strategic colleagues with a focus on leadership,
                product, tech, & customer-facing roles{" "}
              </p>
              <div className="pt-3">
                <span  style={{ marginBottom: "0rem !important" }}>
                  Phone
                </span>
                <p className="font-medium text-lg">+923326101627</p>
                <div style={{ marginBottom: "0rem !important" }}>
                  Email Address
                </div>
                <div>
                  <a
                    className="font-medium text-lg text-gray-800 hover:text-gray-800 cursor-pointer"
                    href="anszeshan786@gmail.com"
                  >
                    anszeshan786@gmail.com
                  </a>
                </div>
              </div>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="w-6/12 ml-4 gap-10 flex flex-wrap md:justify-center">
              {/* Links */}
              <div>
                <span className="text-2xl font-bold">Navigations</span>
                <div className="pt-2">
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Home
                    </Link>
                  </div>
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="contact_us"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Contact us
                    </Link>
                  </div>
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="faq_section"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>
              <div className="">
                <p
                  className="text-2xl font-bold"
                  style={{ marginBottom: "0rem !important" }}
                >
                  Follow us
                </p>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                >
                  <div className="w-36">
                    <img
                      src={require("./../../img/Group 1623.png")}
                      className="w-12"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        <div className="mt-28"></div>
        {/* <div className="last_footer text-muted">
          <hr />
          <div className="pb-3">
            <div className="flex justify-center text-center space-x-6">
              <div className="mt-2 text-xs">
                <span>Alright reserved © 2022 Atilax</span>
              </div>
              <div className="mt-2 text-xs">
                <span>Any Inquiry ?</span>
              </div>
              <div className="mt-2 text-xs">
                <span>Privacy Policy | Terms &amp; Conditions</span>
              </div>
            </div>
          </div>
        </div> */}
      </footer>
    </>
  );
};

export default Landing;
