import Image from 'next/image'

import backgroundImage from './src/background-auth.jpg'

export function VerifyLayout({ children }) {
  return (
    <>
      <div className="flex justify-center h-screen md:px-12 lg:px-0">

          <Image
            className="absolute inset-0 object-cover w-full h-full"
            src={backgroundImage}
            alt=""
            unoptimized
          />
        </div>

    </>
  )
}