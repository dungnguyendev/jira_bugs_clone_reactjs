import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFounf = () => {
  return (
    <section className="flex items-center h-full p-16 text-black">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            You can return to the homepage
          </p>
          <NavLink
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-3 font-semibold rounded bg-orange-400 text-gray-900"
          >Back to homepage

          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default NotFounf