import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";



const baseUrl = "http://localhost:3001/api/v1";

export const nodeAPI = createApi({
  reducerPath: "nodeAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),

  // Entities of API
  tagTypes: [
    "User",
    "Org",
    "Job",
    "Applications",
    "WL"
  ],

  endpoints: (builder) => ({
    //Optimize:  ************************** Authentication ******************************

    //********** Get All users query
    getAllChatUsers: builder.query({
      
      query: (body) => {
        return({
        url: `/${(body.role==='student' || body.role==='researcher')? 'user' : 'employer'}/chatlist/${body._id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`
        }
      })},
      providesTags: [ 'User', 'Org' ],
    }),   

     //********** Login query
    loginUser: builder.mutation( {
      query: (body) => ({
        url: "/user/login/user",
        method: "POST",
        body,
      }),
      invalidatesTags: [ 'User' ],
    }),
    updateMe: builder.mutation( {
      query: (body) => ({
        url: "/user/updateMe",
        method: "PATCH",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`
        }
      }),
      invalidatesTags: [ 'User' ],
    }), 
    deleteApplicant: builder.mutation( {
      query: (id) => ({
        url: `/application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ 'Applications' ],
    }),
    //********** Login query
    loginOrg: builder.mutation( {
      query: (body) => ({
        url: "/employer/login/employer",
        method: "POST",
        body,
      }),
      invalidatesTags: [ 'Org' ],
    }),

    //********** Sign up User
    userSignup: builder.mutation( {
      query: ( body ) => ( {
        url: "/user/signup/user",
        method: "POST",
        body,
      } ),
      invalidatesTags: [ 'User' ],
    } ),
    //********** Sign up Organization
    orgSignup: builder.mutation( {
      query: ( body ) => ( {
        url: "/employer/signup/employer",
        method: "POST",
        body,
      } ),
      invalidatesTags: [ 'Org' ],
    } ),


    //********** Send Reset Password Link to Email
    passwordResetEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/get-password-reset-link",
        method: "POST",
        body,
      }),
      // invalidatesTags: [ 'User' ],
    }),

    //********** Send Reset Password Link to Email
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth//password-reset",
        method: "POST",
        body,
      }),
      // invalidatesTags: [ 'User' ],
    } ), 
    getAllApplicationsByEmp: builder.query({
      query: () => ({
        url: "/application",
        method: "GET",
      }),
      providesTags: [ 'Applications' ],
    } ), 
    getSingleApplicationByEmployer: builder.query({
      query: (id) => ({
        url: `/application/employer/${id}`,
        method: "GET",
      }),
      providesTags: [ 'Applications' ],
    } ),
    //*********** Get all countries data
    getAllCountries: builder.query( {
      query: () => ( {
        url: 'https://restcountries.com/v2/all',
        method: 'GET',
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } )
    } ),
    //********** Create Job by Org
    createJob: builder.mutation( {
      query: ( body ) => ( {
        url: "/job",
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      invalidatesTags: [ 'Job' ],
    } ),
    //********** Get All jobs
    getAllJobs: builder.query( {
      query: ( body ) => ( {
        url: "/job/",
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      providesTags: [ 'Job' ],
    } ),
    //********** Get All jobs of Emp
    getAllJobsEmp: builder.query( {
      query: ( body ) => ( {
        url: `/job/employer/${body}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      providesTags: [ 'Job' ],
    } ),
    //********** Get single job
    getJob: builder.query( {
      query: ( body ) => ( {
        url: `/job/${body.jobId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      providesTags: [ 'Job' ],
    } ),
    updateJob: builder.mutation( {
      query: ( body ) => ( {
        url: `/job/${body.id}`,
        method: "PATCH",
        body: body.data,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      invalidatesTags: [ 'Job' ],
    } ),
    deleteJob: builder.mutation( {
      query: ( body ) => ( {
        url: `/job/${body}`,
        method: "DELETE",
        body: body.data,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),
      invalidatesTags: [ 'Job' ],
    } ),
    addJobToWishList: builder.mutation( {
      query: ( body ) => ( {
        url: `/user/wishlist/add/${body.userId}`,
        method: "POST",
        body: body.data,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),


    } ),
    deleteJobToWishList: builder.mutation( {
      query: ( body ) => ( {
        url: `/user/wishlist/delete/${body.userId}`,
        method: "DELETE",
        body: body.data,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),


    } ),
    getAllWishJobs: builder.query( {
      query: ( body ) => ( {
        url: `/user/wishlist/${body}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),


    } ),
    submitApplication: builder.mutation( {
      query: ( body ) => ( {
        url: `/application/`,
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( 'jwt' )}`
        }
      } ),


    } ),

  }),
});

export const {
  useUserSignupMutation,
  useOrgSignupMutation,
  useLoginMutation,
  usePasswordResetEmailMutation,
  useResetPasswordMutation,
  useGetAllChatUsersQuery,
  useGetAllCountriesQuery,
  useLoginUserMutation,
  useLoginOrgMutation,
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetAllApplicationsByEmpQuery,
  useUpdateMeMutation,
  useDeleteApplicantMutation,
  useGetAllJobsEmpQuery,
  useAddJobToWishListMutation,       
  useDeleteJobToWishListMutation,
  useGetSingleApplicationByEmployerQuery,
  useGetAllWishJobsQuery,
  useSubmitApplicationMutation
} = nodeAPI;
