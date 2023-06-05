import React, { useState, useEffect, Fragment } from "react";
import "./employees.css";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { Transition, Listbox, Menu } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Employees() {
 
  return (
    <div className="contianer_fluid px-2 pe-2">
      <div className="row my-4 pt-3">
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <span className="text-2xl font-medium dark:text-white">
              Employees
            </span>
            <p className="test-base font-base text-gray-500 dark:text-white">
              You can manage Meerkat employees in this section.
            </p>
          </div>
        
          <div className="my-auto">
            <Link
              to={"/dashboard/addemployee"}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-base rounded text-xs px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <FontAwesomeIcon icon={faPlus} />{" "}
              <span className="ms-2"> Add New Employee</span>
            </Link>
          </div>
    
        </div>
      </div>

      <div className="row my-3">
        <div className="w-100">
          <span className="text-lg font-semibold dark:text-white">
            Search Filters
          </span>
          <p className="test-base font-base text-gray-500 dark:text-white">
            With the help of filters you can easily find employees.
          </p>

          <div className="gap-3 flex flex-wrap items-center mt-3">
            <div className="relative w-74 md:w-50">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Employee by name..."
              />
            </div>

            <div className="w-52">
              <div className="">
                <Listbox >
                  <div className="relative md:ml-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        Name
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 z-10 cursor-pointer w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                       
                        
                            <Listbox.Option
                              className={( { active } ) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                  ? "bg-blue-100 text-blue-700"
                                  :"text-gray-900"
                                }`
                              }
                             
                            >
                             
                                  <span
                                    className="block truncate font-medium font-normal"
                                  >
                                    name
                                  </span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>                               
                            </Listbox.Option>
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <hr className="separation_margin" /> */}

      {/* Cards */}

      <section className="employee_cards">
              <div
                className="w-64 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mr-5 mt-4 pt-3 pr-2"
              >
                <div className="flex justify-end">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                      </Menu.Button>
                    </div>
                    
                  </Menu>
                </div>
                <div className="flex flex-col items-center pb-10">
                  
                      <div
                        id="avatar"
                        className="flex items-center justify-center mb-3 w-24 h-24 text-3xl font-medium text-white bg-blue-500 rounded-full"
                      >
                      </div>
              
                
                  <h5 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
full                  </h5>

                  <span className="bg-blue-100 text-blue-800 text-sm font-normal mr-2 px-4 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
role                  </span>

                  <div className="mt-4 text-center">
                    <div className="text-gray-700 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ok    </div>

                    <span className="text-blue-600 text-sm font-normal mr-2 px-2.5 rounded dark:bg-gray-700 dark:text-gray-300">
email                    </span>
                  </div>


    
                </div>
              </div>
          <Empty className="mt-5" />
      </section>
    </div>
  );
}
